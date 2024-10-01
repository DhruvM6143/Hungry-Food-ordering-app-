import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'
const Order = ({ url }) => {

    const [orders, setOrders] = useState([])
    const fetchAllOrders = async () => {
        const response = await axios.get(url + "/api/order/list")

        if (response.data.success) {
            setOrders(response.data.data)
            console.log(response.data.data);

        }
        else {
            toast.error("error")
        }
    }


    useEffect(() => {
        fetchAllOrders()
    }, [])

    const statusHandler = async (event, orderId) => {
        const response = await axios.post(url + '/api/order/status', { orderId, status: event.target.value })
        if (response.data.success) {
            await fetchAllOrders();
        }

    }


    return (
        <div className='p-4'>
            <h3 className='m-[30px] font-bold text-[20px]'>Order Page</h3>
            <div className=''>
                {orders.map((order, index) => (
                    <div
                        className='grid grid-cols-1 sm:grid-cols-[1fr_1fr] md:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-6 items-start border border-red-500 my-[30px] px-4 py-6 text-[14px] text-[#505050]'
                        key={index}
                    >
                        {/* Column 1: Image */}
                        <div className="flex items-center justify-center">
                            <img className='w-[50px]' src={assets.parcel_icon} alt="Parcel Icon" />
                        </div>

                        {/* Column 2: Order Items */}
                        <div>
                            <p className='font-bold'>
                                {order.items.map((item, itemIndex) => (
                                    itemIndex === order.items.length - 1
                                        ? `${item.name} x ${item.quantity}`
                                        : `${item.name} x ${item.quantity}, `
                                ))}
                            </p>
                        </div>

                        {/* Column 3: Address */}
                        <div>
                            <p className='font-bold mt-3 mb-2'>
                                {order.address.firstName} {order.address.lastName}
                            </p>
                            <p className='mb-3'><b>Address: </b>{order.address.street},</p>
                            <p className='mb-3'>{`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipCode}`}</p>
                            <p className=''><b>Phone No: </b>{order.address.phone}</p>
                        </div>

                        {/* Column 4: Order Info */}
                        <div>
                            <p className='mt-2'><b>Items: </b>{order.items.length}</p>
                            <p className='font-bold mt-2'>Amount: ${order.amount}.00</p>
                        </div>

                        {/* Column 5: Status Selector */}
                        <div className='flex flex-col justify-center'>
                            <select onChange={(e) => statusHandler(event, order._id)} value={order.status} className='mt-4 p-2 border border-black rounded'>
                                <option value="Food Processing">Food Processing</option>
                                <option value="Out For Delivery">Out For Delivery</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </div>
                    </div>
                ))}
            </div>
        </div>




    )
}

export default Order