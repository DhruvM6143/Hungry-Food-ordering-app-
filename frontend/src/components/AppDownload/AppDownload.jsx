import React from 'react'
import { assets } from '../../assets/assets'

const AppDownload = () => {
    return (
        <div className='m-auto mt-[100px] text-center font-bold text-[20px] md:text-[3vw]' id='app-download'>
            <p>
                For Better Experience Download <br /> TOMATO App
            </p>
            <div className="flex justify-center gap-4 mt-4 ">
                <img src={assets.play_store} alt="Play Store" className='w-[150px] md:w-[200px] hover:transform hover:scale-105 transition duration-300 ease-in-out' />
                <img src={assets.app_store} alt="App Store" className='w-[150px] md:w-[200px] hover:transform hover:scale-105 transition duration-300 ease-in-out' />
            </div>
        </div>
    )
}

export default AppDownload