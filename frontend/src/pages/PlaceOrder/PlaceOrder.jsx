import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const PlaceOrder = () => {
    const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        phone: "",
        country: ""
    })
    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const placeOrder = async (event) => {
        event.preventDefault();
        let orderItems = [];
        food_list.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id]
                orderItems.push(itemInfo)
            }
        })
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 2


        }
        let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } })
        if (response.data) {
            const { session_url } = response.data;
            window.location.replace(session_url);
        }
        else {
            alert("Error")
        }
    }

    useEffect(() => {
        if (!token) {
            navigate('/cart')
        }
        else if (getTotalCartAmount() === 0) {
            navigate('/cart')
        }
    }, [token])




    const navigate = useNavigate()
    return (
        <form onSubmit={placeOrder} className='flex items-start justify-between gap-[50px] mt-[100px]'>
            <div className='w-[100%] max-w-[max(30%,500px)]'>
                <p className='text-[30px] font-bold mb-[50px]'>Delivery Information</p>
                <div className='flex gap-[10px]'>
                    <input required className='mb-[15px] w-[100%] p-[10px] border-[1px] border-[#c5c5c5] rounded-[4px] outline-red-500' name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
                    <input required className='mb-[15px] w-[100%] p-[10px] border-[1px] border-[#c5c5c5] rounded-[4px] outline-red-500' name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
                </div>
                <input required className='mb-[15px] w-[100%] p-[10px] border-[1px] border-[#c5c5c5] rounded-[4px] outline-red-500' name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address' />
                <input required className='mb-[15px] w-[100%] p-[10px] border-[1px] border-[#c5c5c5] rounded-[4px] outline-red-500' name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
                <div className='flex gap-[10px]'>
                    <input required className='mb-[15px] w-[100%] p-[10px] border-[1px] border-[#c5c5c5] rounded-[4px] outline-red-500' name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
                    <input required className='mb-[15px] w-[100%] p-[10px] border-[1px] border-[#c5c5c5] rounded-[4px] outline-red-500' name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
                </div>
                <div className='flex gap-[10px]'>
                    <input required className='mb-[15px] w-[100%] p-[10px] border-[1px] border-[#c5c5c5] rounded-[4px] outline-red-500' name='zipCode' onChange={onChangeHandler} value={data.zipCode} type="text" placeholder='Zip Code' />
                    <input required className='mb-[15px] w-[100%] p-[10px] border-[1px] border-[#c5c5c5] rounded-[4px] outline-red-500' name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
                </div>
                <input required className='mb-[15px] w-[100%] p-[10px] border-[1px] border-[#c5c5c5] rounded-[4px] outline-red-500' name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />

            </div>
            <div className='w-[100%] max-w-[max(40%,500px)] '>
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
                    <button type='submit' className='border-none mt-[30px] text-white bg-red-500 w-full md:w-[max(15vw,200px)] py-[12px] rounded-[4px] cursor-pointer'>
                        PROCEED TO PAYMENT
                    </button>
                </div>
            </div>




        </form>
    )
}

export default PlaceOrder