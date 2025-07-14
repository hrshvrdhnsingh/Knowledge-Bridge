import { toast } from "react-hot-toast";
import rzpLogo from "../../assets/Logo/rzp_image.png";
import { resetCart } from "../../slices/cartSlice";
import { setPaymentLoading } from "../../slices/courseSlice";
import { apiConnector } from "../apiConnector";
import { studentEndpoints } from "../apis";

const { COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API } = studentEndpoints;

// Load Razorpay SDK dynamically
function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
}

// Buy the Course
export async function BuyCourse(token, courses, user_details, navigate, dispatch) {
    const toastId = toast.loading("Loading...");
    try {
        // 1) Load SDK
        const sdkLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!sdkLoaded) {
            toast.error("Razorpay SDK failed to load. Check your internet.");
            return;
        }

        // 2) Validate public key
        const RAZORPAY_KEY = process.env.REACT_APP_RAZORPAY_KEY;
        if (!RAZORPAY_KEY) {
            console.error("Missing REACT_APP_RAZORPAY_KEY");
            toast.error("Missing Razorpay Key. Please configure REACT_APP_RAZORPAY_KEY.");
            return;
        }

        // 3) Create order on backend
        const orderResponse = await apiConnector(
            "POST",
            COURSE_PAYMENT_API,
            { courses },
            { Authorization: `Bearer ${token}` }
        );
        if (!orderResponse.data.success) throw new Error(orderResponse.data.message);

        const { id: orderId, amount } = orderResponse.data.data;

        // 4) Setup Razorpay
        const options = {
            key: RAZORPAY_KEY,
            currency: "INR",
            amount: amount,
            order_id: orderId,
            name: "Knowledge Bridge",
            description: "Thank you for purchasing the course.",
            image: rzpLogo,
            prefill: {
                name: `${user_details.firstName} ${user_details.lastName}`,
                email: user_details.email,
            },
            handler: function (response) {
                // a) Email notification
                sendPaymentSuccessEmail(response, amount, token);
                console.log(response);
                // b) Verify payment with original keys
                verifyPayment(
                    {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        amount,
                        courses,
                    },
                    token,
                    navigate,
                    dispatch
                );
            },
        };

        // 5) Open checkout
        const razorpay = new window.Razorpay(options);
        razorpay.open();
        razorpay.on("payment.failed", (err) => {
            console.error("Payment failed:", err);
            toast.error("Payment failed. Please try again.");
        });
    } catch (error) {
        console.error("BuyCourse error:", error);
        toast.error(error.response?.data?.message || error.message);
    } finally {
        toast.dismiss(toastId);
    }
}

// Verify the Payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment...");
    dispatch(setPaymentLoading(true));
    try {
        console.log("[verifyPayment] payload:", bodyData);
        const res = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization: `Bearer ${token}`,
        });
        console.log("VERIFY RESPONSE:", res.data);
        if (!res.data.success) throw new Error(res.data.message);

        toast.success("Payment successful! You have been enrolled.");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    } catch (err) {
        console.error("verifyPayment error:", err.response?.data || err.message);
        toast.error(err.response?.data?.message || "Could not verify payment.");
    } finally {
        toast.dismiss(toastId);
        dispatch(setPaymentLoading(false));
    }
}

// Send Payment Success Email
async function sendPaymentSuccessEmail(response, amount, token) {
    try {
        await apiConnector(
            "POST",
            SEND_PAYMENT_SUCCESS_EMAIL_API,
            {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                amount,
            },
            { Authorization: `Bearer ${token}` }
        );
    } 
    catch (e) {
        console.warn("Email notification failed:", e.message);
    }
}
