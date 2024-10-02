import React from 'react'
import { menu_list } from '../../assets/assets'
const ExploreMenu = ({ category, setCategory }) => {
    return (
        <div className='flex flex-col gap-[20px]' id='explore-menu'>
            <h1 className='text-[#262626] font-bold text-xl md:text-2xl lg:text-3xl'>Explore Our Menu</h1>
            <p className='max-w-[90%] sm:max-w-[70%] md:max-w-[60%] text-[#808080] font-bold text-sm sm:text-base md:text-lg'>
            </p>

            <div className='flex justify-between items-center gap-[20px] sm:gap-[30px] text-center my-[20px] overflow-x-auto md:hide-scrollbar'>
                {
                    menu_list.map((item, index) => {
                        return (
                            <div onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} key={index}>
                                <img className={`${category === item.menu_name ? " border-red-500 border-[5px] p-[2px]" : ""} w-[15vw] sm:w-[10vw] md:w-[7.5vw] min-w-[60px] sm:min-w-[80px] cursor-pointer rounded-[50%] transition duration-200`} src={item.menu_image} alt="" />
                                <p className='mt-[10px] text-[#747474] text-[13px] sm:text-[max(1.4vw,13px)] cursor-pointer'>{item.menu_name}</p>
                            </div>
                        )
                    })
                }
            </div>

            <hr className='my-[10px] bg-black h-[2px] border-none font-bold' />
        </div>

    )
}

export default ExploreMenu