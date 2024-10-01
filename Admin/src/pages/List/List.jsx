import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
const List = ({ url }) => {


    const [list, setList] = useState([])
    const fetchList = async () => {
        const response = await axios.get(`${url}/api/food/list`)


        if (response.data) {
            setList(response.data.data)
        }
        else {
            toast.error(response.data.message)
        }
    }

    const removeFood = async (foodId) => {
        const response = await axios.post(`${url}/api/food/remove`, { id: foodId })
        await fetchList();

        if (response.data) {
            toast.success(response.data.message)
        }
        else {
            toast.error("Error")
        }

    }

    useEffect(() => {
        fetchList()
    }, [])


    return (
        <div className='w-full max-w-[1200px] mx-auto'> {/* Set a max width for the container */}
            <p className='text-[20px] font-bold mb-[20px]'>All Food List</p>
            <div className=''>
                <div className='grid items-center gap-[15px] py-[16px] px-[20px] text-[15px] border-[1px] border-[#f9f9f9] bg-[#f1f1f1] font-semibold' style={{ gridTemplateColumns: '0.5fr 2fr 1fr 1fr 0.5fr' }}>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {
                    list.map((item, index) => {
                        return (
                            <div className='grid items-center gap-[15px] py-[16px] px-[20px] text-[15px] border-[1px] border-[#cacaca] hover:bg-[#f5f5f5]' style={{ gridTemplateColumns: '0.5fr 2fr 1fr 1fr 0.5fr' }} key={index}>
                                <img src={`${url}/images/` + item.image} alt="" className='w-[70px] h-[70px] object-cover rounded-[5px]' />
                                <p className='font-medium'>{item.name}</p>
                                <p className='font-medium'>{item.category}</p>
                                <p className='font-medium'>${item.price}</p>
                                <button onClick={() => removeFood(item._id)} className='text-red-500 font-semibold hover:text-red-600'>X</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>


    )
}

export default List