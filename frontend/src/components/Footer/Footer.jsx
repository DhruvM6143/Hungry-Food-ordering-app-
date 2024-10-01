import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='text-[#d9d9d9] bg-[#323232] flex flex-col items-center gap-[20px] py-[20px] px-[5vw] sm:px-[8vw] pt-[80px] mt-[100px]' id='footer'>
            <div className='w-[100%] grid grid-cols-1 sm:grid-cols-[1fr_1fr] lg:grid-cols-[2fr_1fr_1fr] gap-[30px] sm:gap-[50px] lg:gap-[80px]'>
                <div className='flex flex-col gap-[20px] items-start'>
                    <img src={assets.bg_remove} alt="Logo" />
                    <p className='text-[14px] sm:text-[16px]'>
                        Craving something delicious? Let us bring the best local flavors right to your doorstep! Whether you're in the mood for a quick snack, a hearty meal, or something new and exciting, we've got it all. Explore our curated menus, place your order in seconds, and sit back while we take care of the rest. Fresh, fast, and always satisfying – food delivery made easy!
                    </p>
                    <div className='flex'>
                        <a href='www.facebook.com'><img className='w-[30px] sm:w-[35px] lg:w-[40px] mr-[10px] sm:mr-[15px]' src={assets.facebook_icon} alt="Facebook" /></a>
                        <img className='w-[30px] sm:w-[35px] lg:w-[40px] mr-[10px] sm:mr-[15px]' src={assets.twitter_icon} alt="Twitter" />
                        <img className='w-[30px] sm:w-[35px] lg:w-[40px] mr-[10px] sm:mr-[15px]' src={assets.linkedin_icon} alt="LinkedIn" />
                    </div>
                </div>

                <div className='flex flex-col gap-[20px] items-start'>
                    <h2 className='font-bold text-white text-[18px] sm:text-[20px]'>COMPANY</h2>
                    <ul>
                        <li className='mb-[10px] cursor-pointer hover:text-gray-400'><a href="#explore-menu">Home</a></li>
                        <li className='mb-[10px] cursor-pointer hover:text-gray-400'><a href="">About Us</a></li>
                        <li className='mb-[10px] cursor-pointer hover:text-gray-400'><a href="">Delivery</a></li>
                        <li className='mb-[10px] cursor-pointer hover:text-gray-400'><a href="">Privacy Policy</a></li>
                    </ul>
                </div>

                <div className='flex flex-col gap-[20px] items-start'>
                    <h2 className='font-bold text-white text-[18px] sm:text-[20px]'>Get In Touch</h2>
                    <ul>
                        <li className='mb-[10px]'>+91-452-328-313-4</li>
                        <li className='mb-[10px]'>dhruvmm0982gmail.com</li>
                    </ul>
                </div>
            </div>

            <hr className='w-[100%] my-[20px] h-[2px] bg-gray-700 border-none' />

            <p className='text-[12px] sm:text-[14px] lg:text-[16px] text-center'>Copyright 2024  © www.Hunger.com - All Right Reserved</p>
            <p>Created By Dhruv Madaan</p>
        </div>

    )
}

export default Footer