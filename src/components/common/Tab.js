import React from 'react'

const Tab = ({tabData, field, setField}) => {
    return ( 
        <div className='w-[50%] flex justify-center text-xl font-medium rounded-2xl duration-300'>
            {
                tabData.map((entry, index) => (
                    <button key={entry.id} onClick={() => setField(entry.type)} className={`cursor-pointer ${field === entry.type ? "bg-richblack-400 text-richblack-800": "bg-transparent text-richblack-400" } w-[50%] flex justify-center items-center p-2 rounded-2xl`}>{entry?.tabName}</button>

                ))
            }
        </div>
    )
}

export default Tab
