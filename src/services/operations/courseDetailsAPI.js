import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { courseEndpoints } from "../apis";

const {
    COURSE_DETAILS_API,
    COURSE_CATEGORIES_API,
    GET_ALL_COURSE_API,
    CREATE_COURSE_API,
    EDIT_COURSE_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    DELETE_COURSE_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    CREATE_RATING_API,
    LECTURE_COMPLETION_API,
} = courseEndpoints; // Getting the URLs into a local constant

export const getAllCourses = async () => {
    const toastId = toast.loading("Loading...");
    let result = [];
    try {
        const response = await apiConnector("GET", GET_ALL_COURSE_API);
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Course Categories");
        }
        result = response?.data?.data;
    } catch (error) {
        //     console.log("GET_ALL_COURSE_API API ERROR............", error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
};

export const fetchCourseDetails = async (courseId) => {
    const toastId = toast.loading("Loading...");
    //   dispatch(setLoading(true));
    let result = null;
    try {
        const response = await apiConnector("POST", COURSE_DETAILS_API, { courseId });
        //     console.log("COURSE_DETAILS_API API RESPONSE............", response);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        result = response.data;
    } catch (error) {
        //     console.log("COURSE_DETAILS_API API ERROR............", error);
        result = error.response.data;
        // toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    //   dispatch(setLoading(false));
    return result;
};

// fetching the available course categories
export const fetchCourseCategories = async () => {
    let result = [];
    try {
        const response = await apiConnector("GET", COURSE_CATEGORIES_API);
        //     console.log("COURSE_CATEGORIES_API API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Course Categories");
        }
        result = response?.data?.allCategories;
    } catch (error) {
        //     console.log("COURSE_CATEGORY_API API ERROR............", error);
        toast.error(error.response.data.message);
    }
    return result;
};

// Creating a course is a protected component meainng only a valid registerd instructor can create a course.
// Hence we pass the Bearer worth the request so that it knows it has to bear a token and verify the token and 
// then extract it's payload.
// Axios merges the formData and the headers together and makes sure they travel together.
export const addCourseDetails = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    // console.log([...data.entries()]);
    try {
        const response = await apiConnector("POST", CREATE_COURSE_API, data, {
            Authorization: `Bearer ${token}`,
        });
        console.log("CREATE COURSE API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Add Course Details");
        }
        toast.success("Course Details Added Successfully");
        result = response?.data?.data;
    } 
    catch (error) {
        console.log("CREATE COURSE API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
};

// edit the course details
export const editCourseDetails = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", EDIT_COURSE_API, data, {
            Authorization: `Bearer ${token}`,
        });
        //     console.log("EDIT COURSE API RESPONSE............", response);

        if (!response?.data?.success) {
            throw new Error("Could Not Update Course Details");
        }
        toast.success("Course Details Updated Successfully");
        result = response?.data?.data;
    } 
    catch (error) {
        //     console.log("EDIT COURSE API ERROR............", error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
};

// Create a section. The section id is also sent with this request. In the backend the section is created
// and then the course is fetched and the new section is pushed onto the courseContent. 
export const createSection = async (data, token) => {
    let result = null;
    console.log("Data -> ", data);
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", CREATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        });
        //     console.log("CREATE SECTION API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Create Section");
        }
        toast.success("Course Section Created");
        result = response?.data?.updatedCourse;
    }
    catch (error) {
        //     console.log("CREATE SECTION API ERROR............", error);
        toast.error(error.response.data.message);
    }

    toast.dismiss(toastId);
    // console.log("Result -->", result);
    return result;
};

// create a subsection -> Find the secton is belongs to -> push the new subsection onto it.
export const createSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`,
        });
        //     console.log("CREATE SUB-SECTION API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Add Lecture");
        }
        toast.success("Lecture Added");

        result = response?.data?.updatedSection;
        //     console.log("Result ->", result);
    } 
    catch (error) {
        //     console.log("CREATE SUB-SECTION API ERROR............", error);
        toast.error("Try again.");
    }
    toast.dismiss(toastId);
    return result;
};

// update a section -> find the course -> insert the new courseContent
export const updateSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        });
        //     console.log("UPDATE SECTION API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Update Section");
        }
        toast.success("Course Section Updated");
        result = response?.data?.data;
    } 
    catch (error) {
        //     console.log("UPDATE SECTION API ERROR............", error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
};

// update a subsection -> find the section it belongs to -> 
export const updateSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`,
        });
        //     console.log("UPDATE SUB-SECTION API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Update Lecture");
        }
        toast.success("Lecture Updated");
        result = response?.data?.data;
    } 
    catch (error) {
        //     console.log("UPDATE SUB-SECTION API ERROR............", error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
};

// delete a section -> find the course and remove the section from courseContent -> then use the section_id
// to delete all the subsections of that section
export const deleteSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", DELETE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        });
        //     console.log("DELETE SECTION API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Delete Section");
        }
        toast.success("Course Section Deleted");
        result = response?.data?.data;
    } 
    catch (error) {
        //     console.log("DELETE SECTION API ERROR............", error);
        toast.error("Couldn't delete section.");
    }
    toast.dismiss(toastId);
    return result;
};

// delete a subsection -> remove the subsection from the section -> delete the section
export const deleteSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`,
        });
        //     console.log("DELETE SUB-SECTION API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Delete Lecture");
        }
        toast.success("Lecture Deleted");
        result = response?.data?.data;
    } 
    catch (error) {
        //     console.log("DELETE SUB-SECTION API ERROR............", error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
};

// fetching all courses under a specific instructor
export const fetchInstructorCourses = async (token) => {
    let result = [];
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("GET", GET_ALL_INSTRUCTOR_COURSES_API, null, {
            Authorization: `Bearer ${token}`,
        });
        //     console.log("INSTRUCTOR COURSES API RESPONSE............", response);

        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Instructor Courses");
        }
        result = response?.data?.data;
    } 
    catch (error) {
        //     console.log("INSTRUCTOR COURSES API ERROR............", error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
};

// delete a course -> find the students enrolled in the course -> remove the course from enrolledCourses
export const deleteCourse = async (data, token) => {
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
            Authorization: `Bearer ${token}`,
        });
        //     console.log("DELETE COURSE API RESPONSE............", response);

        if (!response?.data?.success) {
            throw new Error("Could Not Delete Course");
        }
        toast.success("Course Deleted");
    } 
    catch (error) {
        //     console.log("DELETE COURSE API ERROR............", error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
};

// get full details of a course -> via searching the and then populating the fields and returning the result
export const getFullDetailsOfCourse = async (courseId, token) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try {
        const response = await apiConnector(
            "POST", GET_FULL_COURSE_DETAILS_AUTHENTICATED,
            { courseId }, { Authorization: `Bearer ${token}` }
        );
        //     console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        //     console.log("Response data -> ", response);
        result = response?.data?.data;
    } 
    catch (error) {
        //     console.log("COURSE_FULL_DETAILS_API API ERROR............", error);
        result = error.response.data;
        // toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
};

// mark a lecture as complete -> find the course and the user document -> add the subsection to the 
// completedVideos field of courseProgress
export const markLectureAsComplete = async (data, token) => {
    let result = null;
    // console.log("mark complete data", data);
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
            Authorization: `Bearer ${token}`,
        });
        //     console.log("MARK_LECTURE_AS_COMPLETE_API API RESPONSE............", response);

        if (!response.data.message) {
            throw new Error(response.data.error);
        }
        toast.success("Lecture Completed");
        result = true;
    } 
    catch (error) {
        //     console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error);
        toast.error(error.response.data.message);
        result = false;
    }
    toast.dismiss(toastId);
    return result;
};

// create a rating for course -> check if ther user has alrady reviewed the course -> if not then push teh 
// rating in the ratingAndReview field.
export const createRating = async (data, token) => {
    const toastId = toast.loading("Loading...");
    let success = false;
    try {
        const response = await apiConnector("POST", CREATE_RATING_API, data, {
            Authorization: `Bearer ${token}`,
        });
        //     console.log("CREATE RATING API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Create Rating");
        }
        toast.success("Rating Created");
        success = true;
    } 
    catch (error) {
        success = false;
        //     console.log("CREATE RATING API ERROR............", error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return success;
};
