import React from 'react'
import { cn } from '../Utils/cn'

const ProfileButton = ({func,Icon,name,color}) => {
    return (
        <div className={cn(
           color," rounded-lg w-full flex justify-center h-10 items-center  "
        )}>
            <button className='flex gap-2 text-white' onClick={func}>{Icon} {name}</button>
        </div>
    )
}

export default ProfileButton
