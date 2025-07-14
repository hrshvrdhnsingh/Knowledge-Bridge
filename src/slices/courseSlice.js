import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    step: 1, // Which step we are on of creating a new course
    course: null,
    editCourse: false, // Are we in edit mode
    paymentLoading: false, // Loading during the payment operation like verifyingPayment
}

const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {
        setStep: (state, action) => {
            state.step = action.payload
        },
        setCourse: (state, action) => {
            state.course = action.payload
        },
        setEditCourse: (state, action) => {
            state.editCourse = action.payload
        },
        setPaymentLoading: (state, action) => {
            state.paymentLoading = action.payload
        },
        resetCourseState: (state) => {
            state.step = 1
            state.course = null
            state.editCourse = false
        },
    },
})

export const { setStep, setCourse, setEditCourse, setPaymentLoading, resetCourseState } = courseSlice.actions;
export default courseSlice.reducer;