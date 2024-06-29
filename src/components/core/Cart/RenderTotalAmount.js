import React from 'react'
import { useSelector } from 'react-redux'

const RenderTotalAmount = () => {
    const {total, cart} = useSelector( (state) => state.cart);

    const handleBuyCourse = () => {
        const courses = cart.map( (course) => course._id);
        console.log("To buy this course : ", courses);
        //TODO: API integrate payment gateway.
    }
    return (
        <div>
            <p>Total : </p>
            <p>Rs {total}</p>
            <button onClick={handleBuyCourse}>Buy Now</button>
        </div>
    )
}

export default RenderTotalAmount
