import React, { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = () => {


    const { cartItems, food_list, removeFromCart, getTotalCartAmount, url, token } = useContext(StoreContext)

    const toastnotification = () => {
        if (getTotalCartAmount() > 0 && token) {
            toast.success("Please Enter your Details")
        }
        else if (!token) {
            toast.error("Please Login First")


        }
    }

    return (
        <div className='mt-[100px] '>
            <div>
                <div className='grid items-center text-gray-500 text-[12px] md:text-[max(1vw,12px)]' style={{ gridTemplateColumns: '1fr 1.5fr 1fr 1fr 1fr 0.5fr' }}>
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {food_list.map((item, index) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <div key={index}>
                                <div className='grid items-center text-[12px] md:text-[max(1vw,12px)] my-[10px] mx-[0px] text-black' style={{ gridTemplateColumns: '1fr 1.5fr 1fr 1fr 1fr 0.5fr' }}>
                                    <img className='w-[50px]' src={url + "/images/" + item.image} alt="" />
                                    <p>{item.name}</p>
                                    <p>${item.price}</p>
                                    <p>{cartItems[item._id]}</p>
                                    <p>${item.price * cartItems[item._id]}</p>
                                    <p className='cursor-pointer' onClick={() => removeFromCart(item._id)}>X</p>
                                </div>
                                <hr className='h-[1px] bg-[#e2e2e2] border-none' />
                            </div>
                        )
                    }
                })}
            </div>

            <div className='mt-[80px] flex flex-col md:flex-row justify-between gap-[20px] md:gap-[max(12vw,20px)]'>
                <div className='flex-[1] flex flex-col gap-[20px]'>
                    <h2>Cart Total</h2>
                    <div>
                        <div className='flex justify-between text-[#555]'>
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr className='my-[10px] w-full h-[2px] bg-[#888] border-none' />
                        <div className='flex justify-between text-[#555]'>
                            <p>Delivery Fee</p>
                            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <hr className='my-[10px] w-full h-[2px] bg-[#888] border-none' />
                        <div className='flex justify-between text-[#555]'>
                            <b>Total</b>
                            <b>${getTotalCartAmount() > 0 ? getTotalCartAmount() + 2 : 0}</b>
                        </div>
                    </div>
                    <Link to='/order'><button onClick={toastnotification} className='border-none text-white bg-red-500 w-full md:w-[max(15vw,200px)] py-[12px] rounded-[4px] cursor-pointer'>
                        PROCEED TO CHECKOUT
                    </button></Link>
                </div>

                <div className='flex-[1]'>
                    <div>
                        <p className='text-[#555]'>If you have a promo code, enter here</p>
                        <div className='mt-[10px] flex justify-between items-center bg-[#eaeaea] rounded-[2px]'>
                            <input className='bg-transparent outline-none pl-[10px] w-full' type="text" placeholder='Enter Promocode' />
                            <button className='w-[max(10vw,150px)] py-[12px] bg-black border-none text-white rounded-[4px]'>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Cart