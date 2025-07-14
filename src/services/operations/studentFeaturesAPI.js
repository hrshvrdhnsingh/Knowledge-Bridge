import { toast } from "react-hot-toast";
import rzpLogo from "../../assets/Logo/rzp_image.png";
import { resetCart } from "../../slices/cartSlice";
import { setPaymentLoading } from "../../slices/courseSlice";
import { apiConnector } from "../apiConnector";
import { studentEndpoints } from "../apis";

const { COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API } = studentEndpoints;

// Load the Razorpay SDK dynamically
function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
}

// Buy the Course (courses)
export async function BuyCourse(token, courses, user_details, navigate, dispatch) {
    const toastId = toast.loading("Loading...");
    try {
        // 1) Load Razorpay checkout script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
            toast.error("Razorpay failed to load. Check your Internet Connection.");
            return;
        }

        // 2) Initiate order on backend
        const orderResponse = await apiConnector(
            "POST",
            COURSE_PAYMENT_API,
            { courses },
            { Authorization: `Bearer ${token}` }
        );
        if (!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }

        const orderData = orderResponse.data.data;
        console.log("PAYMENT RESPONSE orderResponse ->", orderResponse);

        // 3) Configure Razorpay options
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY,
            currency: "INR",
            amount: `${orderData.amount}`,
            order_id: orderData.id,
            name: "Knowledge Bridge",
            description: "Thank you for purchasing the course.",
            image: rzpLogo,
            prefill: {
                name: `${user_details.firstName} ${user_details.lastName}`,
                email: user_details.email,
            },
            handler: function (response) {
                // 4a) Fire-and-forget email notification
                sendPaymentSuccessEmail(response, orderData.amount, token);
                // 4b) Verify payment with proper payload
                verifyPayment(
                    {
                        orderId: response.razorpay_order_id,
                        paymentId: response.razorpay_payment_id,
                        signature: response.razorpay_signature,
                        amount: orderData.amount,
                        courses,
                    },
                    token,
                    navigate,
                    dispatch
                );
            },
        };

        // 5) Open Razorpay checkout
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function (response) {
            toast.error("Oops! Payment Failed.");
            console.log(response.error);
        });
    } catch (error) {
        console.log("PAYMENT API ERROR............", error);
        toast.error(error.response?.data?.message || error.message);
    } finally {
        toast.dismiss(toastId);
    }
}

// Verify the Payment
async function verifyPayment(
    { orderId, paymentId, signature, amount, courses },
    token,
    navigate,
    dispatch
) {
    const toastId = toast.loading("Verifying Payment...");
    dispatch(setPaymentLoading(true));
    try {
        const response = await apiConnector(
            "POST",
            COURSE_VERIFY_API,
            { orderId, paymentId, signature, amount, courses },
            { Authorization: `Bearer ${token}` }
        );
        console.log("VERIFY PAYMENT RESPONSE FROM BACKEND............", response);
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("Payment Successful. You are Added to the course ");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    } catch (error) {
        console.log("PAYMENT VERIFY ERROR............", error);
        toast.error(error.response?.data?.message || "Could Not verify payment.");
    } finally {
        toast.dismiss(toastId);
        dispatch(setPaymentLoading(false));
    }
}

// Send the Payment Success Email
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
    } catch (error) {
        // Silent fail for email
    }
}
