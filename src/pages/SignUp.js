import React from 'react'
import Template from '../components/core/Authorisation/Template';
import SignUpImage from '../assets/Images/signup.avif'

const SignUp = () => {
    return (
        <Template
            title="Join the millions learning to code with Knowledge Bridge for free"
            description1="Build skills for today, tomorrow, and beyond."
            description2="Education to future-proof your career."
            image={SignUpImage}
            formType="signup"
            height="130%"
        />
    )
}

export default SignUp
