import React from 'react'

const Input = ({name,Icon,value}) => {
    return (
        <div >
            <label className='flex gap-2 mx-auto font-semibold text-white pb-2'> {Icon} {name}</label>
            <div className='bg-slate-200  border-2 rounded-lg w-sm pl-3 h-10 flex items-center lg:w-lg md:w-lg'>
                <p>{value}</p>
            </div>
        </div>
    )
}

export default Input
