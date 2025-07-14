// Takes an object whose values are slice reducer functions, and returns a single reducer function.
// Internally, calls each reducer with it's own slice of the state and the action(value).
// This way we have modularity, logic-separation and scalability.
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../slices/authSlice';
import profileReducer from '../slices/profileSlice';
import cartReducer from '../slices/cartSlice';
import courseReducer from '../slices/courseSlice';
import viewCourseReducer from '../slices/viewCourse';

const rootReducer = combineReducers({
    auth : authReducer,
    profile: profileReducer,
    cart: cartReducer,
    course: courseReducer,
    viewCourse: viewCourseReducer
})

export default rootReducer;