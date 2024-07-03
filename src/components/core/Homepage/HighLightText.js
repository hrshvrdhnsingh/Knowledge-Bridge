import React from 'react'

const HighLightText = ({text}) => {
    return (
        <span className='font-bold bg-gradient-to-b from-[#56b6fa] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text '>
            {text}
        </span>
    )
}

export default HighLightText
