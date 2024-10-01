import React from 'react'
import { assets } from '../../assets/assets'
const NavBar = () => {
    return (
        <div className='flex justify-between items-center py-[8px] px-[8%]'>
            <img className='w-[100px] h-[100px]' src={assets.bg_remove} alt="" />
            <img className='w-[40px]' src={assets.profile_image} alt="" />
        </div>
    )
}

export default NavBar