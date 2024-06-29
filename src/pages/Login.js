import React from 'react'
import Template from '../components/core/Authorisation/Template'
import LoginImage from '../assets/Images/login.jpg';

const Login = () => {
    return (
        <Template
        title="Welcome Back"
        description1="Build skills for today, tomorrow, and beyond."
        description2="Education to future-proof your career."
        image={LoginImage}
        formType="login"
        height="85%"
    />
    )
}

export default Login
