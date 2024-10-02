import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'

const MyOrders = () => {

    const { url, token } = useContext(StoreContext)
    const [data, setData] = useState([])
    const fetchOrder = async () => {
        const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } })
        setData(response.data.data)


    }

    useEffect(() => {
        if (token) {

            fetchOrder()
        }

    }, [token])

    return (
        <div className='m-[50px_0px]'>
            <h2 className='font-bold text-[40px] sm:text-[25px]'>My Orders</h2>
            <div className='flex flex-col gap-[20px] mt-[30px]'>
                {
                    data.map((order, index) => {
                        return (
                            <div
                                className='grid items-center gap-[30px] text-[14px] p-[10px_20px] text-[#454545] border-[1px] border-red-500
            grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr]'
                                key={index}
                            >
                                <img className='w-[50px]' src={assets.parcel_icon} alt="" />
                                <p>
                                    {order.items.map((item, index) => (
                                        index === order.items.length - 1
                                            ? item.name + " X " + item.quantity
                                            : item.name + " X " + item.quantity + ","
                                    ))}
                                </p>
                                <p>${order.amount}.00</p>
                                <p>Items: {order.items.length}</p>
                                <p>
                                    <span className='text-red-500'>&#x25cf;</span>
                                    <b className='font-bold text-[#454545]'>{order.status}</b>
                                </p>
                                <button onClick={fetchOrder} className='border-none p-[12px_0px] rounded-[4px] bg-[#ffe1e1] cursor-pointer text-[#454545]'>
                                    Track Order
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        </div>

    )
}

export default MyOrders