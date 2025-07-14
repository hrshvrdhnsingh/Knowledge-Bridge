import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { catalogData } from "../apis";

// Get the courses for the selected category, then the ones of not the selected category and then the
// most selling courses
export const getCatalogPageData = async (categoryId) => {
    const toastId = toast.loading("Loading...");
    let result = [];
    try {
        const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, {
            categoryId: categoryId,
        });
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Catagory page data.");
        }
        result = response?.data;
    } 
    catch (error) {
        //     console.log("CATALOGPAGEDATA_API API ERROR............", error);
        toast.error(error.response.data.message);
        result = error.response?.data;
    }
    toast.dismiss(toastId);
    return result;
};
