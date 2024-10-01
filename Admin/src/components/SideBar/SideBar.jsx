import React from 'react'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
    return (
        <div className='w-[18%] sm:w-[25%] md:w-[20%] lg:w-[18%] min-h-[100vh] border-[1.5px] border-[#a9a9a9] border-t-0 text-[max(2.5vw,10px)] sm:text-[max(1.5vw,12px)]'>
            <div className='pt-[50px] pl-[10%] sm:pl-[15%] md:pl-[20%] flex flex-col gap-[20px]'>
                <NavLink
                    to='/add'
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-[#fff0ed] border-red-400 flex flex-col items-start gap-[12px] py-[8px] px-[10px] rounded-[3px_0px_0px_3px] cursor-pointer'
                            : 'flex  flex-col items-start gap-[12px] border-[1px] border-[#a9a9a9] border-r-0 py-[8px] px-[10px] rounded-[3px_0px_0px_3px] cursor-pointer'
                    }
                >
                    <img src={assets.add_icon} alt="Add Icon" className='w-[15px] sm:w-[20px]' />
                    <p className='text-[max(2vw,12px)]'>Add Items</p>
                </NavLink>

                <NavLink
                    to='/list'
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-[#fff0ed]  border-red-400 flex flex-col items-start gap-[12px] py-[8px] px-[10px] rounded-[3px_0px_0px_3px] cursor-pointer'
                            : 'flex flex-col items-start gap-[12px] border-[1px] border-[#a9a9a9] border-r-0 py-[8px] px-[10px] rounded-[3px_0px_0px_3px] cursor-pointer'
                    }
                >
                    <img src={assets.order_icon} alt="List Icon" className='w-[15px] sm:w-[20px]' />
                    <p className='text-[max(2vw,12px)]'>List Items</p>
                </NavLink>

                <NavLink
                    to='/order'
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-[#fff0ed] border-red-400 flex flex-col items-start gap-[12px] py-[8px] px-[10px] rounded-[3px_0px_0px_3px] cursor-pointer'
                            : 'flex flex-col items-start gap-[12px] border-[1px] border-[#a9a9a9] border-r-0 py-[8px] px-[10px] rounded-[3px_0px_0px_3px] cursor-pointer'
                    }
                >
                    <img src={assets.order_icon} alt="Order Icon" className='w-[15px] sm:w-[20px]' />
                    <p className='text-[max(2vw,12px)]'>Orders</p>
                </NavLink>

            </div>
        </div>

    )
}

export default SideBar