import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import { toast } from 'react-toastify';
const NavBar = ({ setShowLogin }) => {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('token')
        setToken("")
        navigate('/')
        toast.success("Logout Success")
    }
    const { getTotalCartAmount, token, setToken } = useContext(StoreContext)
    const [menu, setMenu] = useState('home');
    return (
        <>
            <div className='pt-[7px] flex justify-between items-center'>
                <Link to='/'><img src={assets.bg_remove} className='w-[120px] md:w-[150px] h-[100px]' alt="" /></Link>
                <ul className='hidden md:flex list-none gap-[20px] text-[#46557e] text-[16px] md:text-[18px] cursor-pointer'>
                    <Link to='/' onClick={() => setMenu("home")} className={`${menu === 'home' ? 'pb-[2px] border-b-2 border-[#49557e]' : ''}`}>Home</Link>
                    <a href='#explore-menu' onClick={() => setMenu("menu")} className={`${menu === 'menu' ? 'pb-[2px] border-b-2 border-[#49557e]' : ''}`}>Menu</a>
                    <a href='#app-download' onClick={() => setMenu("mobile")} className={`${menu === 'mobile' ? 'pb-[2px] border-b-2 border-[#49557e]' : ''}`}>Mobile App</a>
                    <a href='#footer' onClick={() => setMenu("contact")} className={`${menu === 'contact' ? 'pb-[2px] border-b-2 border-[#49557e]' : ''}`}>Contact us</a>
                </ul>
                <div className='flex items-center gap-[20px] md:gap-[40px] mt-4 md:mt-0'>
                    <img className='sm:w-[20px]' src={assets.search_icon} alt="" />
                    <div className='relative '>
                        <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                        <div className={getTotalCartAmount() === 0 ? "" : "absolute min-w-[10px] min-h-[10px] bg-red-500 rounded-[5px] top-[-8px] right-[-8px]"}></div>
                    </div>
                    {!token ? <button onClick={() => setShowLogin(true)} className='bg-transparent font-[16px] font-[#46557e] border border-red-500 py-[10px] px-[20px] md:px-[30px] rounded-[50px] cursor-pointer hover:bg-[#fff4f2] transition duration-300'>Sign In</button> :
                        <div className='relative group'>

                            <img src={assets.profile_icon} className='cursor-pointer' alt="Profile Icon" />


                            <ul className='absolute hidden right-0 z-30 group-hover:flex flex-col gap-[10px] bg-[#fff2ef] py-[12px] px-[25px] rounded-[4px] border-[1px] border-red-500 outline-[2px] hover:items-center hover:cursor-pointer outline-white'>
                                <li onClick={() => navigate('/myorders')} className='hover:text-red-500 hover:font-bold  flex items-center gap-[10px]'>
                                    <img src={assets.bag_icon} alt="Orders Icon" className='w-[20px] h-[20px]' />
                                    <p className='text-[14px]'>Orders</p>
                                </li>
                                <hr />
                                <li onClick={logout} className='hover:text-red-500 hover:font-bold flex items-center gap-[10px]'>
                                    <img src={assets.logout_icon} alt="Logout Icon" className='w-[20px] h-[20px]' />
                                    <p className='text-[14px]'>Logout</p>
                                </li>
                            </ul>
                        </div>

                    }

                </div>
            </div>
        </>
    )
}

export default NavBar