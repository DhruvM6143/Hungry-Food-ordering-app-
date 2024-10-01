import React from 'react'

const Header = () => {
    return (
        <div className='relative z-10 h-[50vh] sm:h-[34vw] my-[30px] mx-auto bg-[url("/headerimg.webp")] bg-no-repeat bg-cover rounded-[20px]'>
            <div className='absolute flex flex-col items-start gap-[10px] md:gap-[1.1vw] max-w-[90%] md:max-w-[50%] bottom-[10%] left-[6vw] animate-fadeIn'>
                <h2 className='font-medium  text-[24px] sm:text-[max(4.5vw,22px)] text-red-400'>Order Your Favorite Food Here</h2>
                <p className='text-white text-[12px] sm:text-[1vw] leading-normal font-bold'>
                    Craving something delicious? Let us bring the best local flavors right to your doorstep! Whether you're in the mood for a quick snack, a hearty meal, or something new and exciting, we've got it all. Explore our curated menus, place your order in seconds, and sit back while we take care of the rest. Fresh, fast, and always satisfying – food delivery made easy!
                </p>
                <a href='#explore-menu' className='border-none text-[#747474] font-medium py-[10px] sm:py-[1vw] px-[15px] sm:px-[2.3vw] bg-white text-[14px] sm:text-[max(1vw,13px)] rounded-[50px] border border-black'>
                    View Menu
                </a>
            </div>
        </div>

    )
}

export default Header