import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import { toast } from 'react-toastify';
import axios from 'axios'
const Loginpopup = ({ setShowLogin }) => {
    const { url, setToken } = useContext(StoreContext)


    const [data, setdata] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setdata(data => ({ ...data, [name]: value }))

    }

    const onLogin = async (event) => {
        event.preventDefault()
        let newUrl = url;
        if (currState === 'Login') {
            newUrl += "/api/user/login"
        }
        else {
            newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl, data)

        if (response.data) {
            setToken(response.data.token)
            localStorage.setItem('token', response.data.token)
            setShowLogin(false)
        } else {
            toast(response.data.message)
        }
    }




    const [currState, setCurrState] = useState("Login")
    return (
        <div className='absolute z-50 w-[100%] h-[100%] bg-[#00000090] grid'>
            <form onSubmit={onLogin} className='place-self-center w-[max(23vw,330px)] text-[#808080] bg-white flex flex-col gap-[25px] px-[30px] py-[25px] rounded-[8px] text-[14px] animate-fadeIn'>
                <div className='flex justify-between items-center text-black'>
                    <h2>{currState}</h2>
                    <img className='w-[16px] cursor-pointer' onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className='flex flex-col gap-[20px]'>
                    {
                        currState === "Login" ? <></> : <input className='outline-none border-[1px] p-[10px] rounded-[4px] border-white-800' type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='Your Name' required />
                    }
                    <input className='outline-none border-[1px] p-[10px] rounded-[4px] border-white-800' name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your E-mail' required />
                    <input className='outline-none border-[1px] p-[10px] ronuded-[4px] border-white-800' name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Your Password' required />
                </div>
                <button type='submit' className='border-none p-[10px] rounded-[4px] text-white bg-red-500 text-[15px] cursor-pointer'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className='flex items-start gap-[8px] mt-[-15px]'>
                    <input className='mt-[5px]' type="checkbox" required />
                    <p>By continuing, i agree to the term of use & privacy policy.</p>
                </div>
                {
                    currState === "Login" ? <p>Create a new account? <span className='text-red-500 font-bold cursor-pointer' onClick={() => setCurrState("Sign Up")}>Click here</span></p> : <p>Already have an account? <span className='text-red-500 font-bold cursor-pointer' onClick={() => setCurrState("Login")}>Login here</span></p>
                }


            </form>
        </div>
    )
}

export default Loginpopup