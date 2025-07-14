import { createSlice } from "@reduxjs/toolkit";
// Redux: "single source-of-truth" holdign all of the app's state. It centralizes the state so that we can
// avoid passing down props from components several level deep. Here the actions(value) are what happened and 
// the "Reducers" are the pure functions that update the state

// A slice is used to bundle together a domain of global varaibles and the reducers that update it.
// Slice allows us to operate safely on mutating logic such as token, via converting to immutable states. 
const initialState =  {
    signupData: null,
    loading: false,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
};

// Here all the actions are prefixed vai the slice name => auth/setSignupData and so on.
const authSlice = createSlice({
    name:"auth",
    initialState: initialState,
    reducers: {
        // Here state is the current state of auth slice.
        // And the value is the data that's being dispatched from the components.
        // ex: { type: "auth/setSignupData", payload: { firstName: "Sumit", email: "a@x.com" } }
        setSignupData(state, value) {  
            state.signupData = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
        setToken(state, value) {
            state.token = value.payload;
        },
    },
});

export const {setToken, setLoading, setSignupData} = authSlice.actions;
// The actions part internally makes sure there are action generator for all the reducers we defined. 
// function setSignupData(payload) {
//     return { type: "auth/setSignupData", payload };
// }
export default authSlice.reducer; // To export(expose) the handler for all the authSlice actions => auth/*