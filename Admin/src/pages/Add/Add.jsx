import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify';

const Add = ({ url }) => {

    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Salad',

    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('category', data.category);
        formData.append('image', image);

        try {
            const response = await axios.post(`${url}/api/food/add`, formData);
            console.log(response.data); // Log the response for debugging

            if (response.data) {
                setData({
                    name: '',
                    description: '',
                    price: '',
                    category: 'Salad',
                });
                setImage(false);
                toast.success(response.data.message); // Show success toast
            } else {
                toast.error(response.data.message || "Failed to add food item"); // Use server message if available
            }
        } catch (error) {
            console.error(error); // Log error for debugging
            toast.error("An error occurred while adding the food item"); // Show generic error toast
        }
    }


    return (
        <div className='w-[70%] ml-[max(5vw,25px)] mt-[50px] text-[#6d6d6d] text-[16px]'>
            <form className='gap-[20px] flex flex-col ' onSubmit={onSubmitHandler}>
                <div className='flex flex-col gap-[10px] '>
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img className='w-[120px]' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' name='image' hidden required />
                </div>
                <div className='flex flex-col gap-[10px]  w-[max(40%,280px)]'>
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={data.name} className='rounded-[7px] border-[1px] border-black p-[10px]' type="text" name="name" placeholder='Type Here' />
                </div>
                <div className='flex flex-col gap-[10px] w-[max(40%,280px)]'>
                    <p>Product Description</p>
                    <textarea onChange={onChangeHandler} value={data.description} className='p-[10px] rounded-[7px] border-[1px] border-black' name="description" rows='6' placeholder='write content here' required></textarea>
                </div>
                <div className='flex gap-[30px]'>
                    <div className='flex flex-col gap-[10px]'>
                        <p>Product Category</p>
                        <select onChange={onChangeHandler} value={data.category} className='w-[120px] p-[10px] rounded-[7px] border-[1px] border-black' name="category" >
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-[10px]'>
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} value={data.price} className='w-[120px] p-[10px] rounded-[7px] border-[1px] border-black' type="Number" name='price' placeholder='$20' />
                    </div>
                </div>
                <button type='submit' className='max-w-[120px] border-none p-[10px] bg-black text-white cursor-pointer'>ADD</button>
            </form>
        </div>
    )
}

export default Add