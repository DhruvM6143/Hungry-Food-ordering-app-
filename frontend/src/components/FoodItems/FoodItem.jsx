import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({ name, description, price, id, image }) => {
    const { addToCart, removeFromCart, cartItems, url } = useContext(StoreContext)


    return (
        <div className='w-[100%] m-auto rounded-[15px] shadow-[0px_0px_10px_#00000015] transition duration-200 animate-fadeIn'>
            <div className='relative '>
                <img src={url + "/images/" + image} className='w-[100%] rounded-[15px_15px_0px_0px]' alt="" />
                {
                    !cartItems[id]
                        ? <img className='w-[35px] absolute bottom-[15px] right-[15px] cursor-pointer rounded-[50%]' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
                        : <div className='absolute bottom-[15px] right-[15px] flex items-center gap-[10px] p-[6px] rounded-[50px] bg-white'>
                            <img className='w-[30px]' onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                            <p>{cartItems[id]}</p>
                            <img className='w-[30px]' onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
                        </div>
                }
            </div>
            <div className='p-[20px]'>
                <div className='flex justify-between items-center mb-[10px]'>
                    <p className='text-[18px] font-bold'>{name}</p>
                    <img className='w-[70px]' src={assets.rating_starts} alt="" />
                </div>
                <p className='text-[#676767] text-[12px] font-bold'>{description}</p>
                <p className='text-red-500 text-[22px] font-bold my-[10px]'>${price}</p>
            </div>
        </div>
    )
}

export default FoodItem