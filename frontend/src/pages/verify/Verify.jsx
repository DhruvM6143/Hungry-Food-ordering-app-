import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const navigate = useNavigate()

    const { url } = useContext(StoreContext)
    const verifypayment = async () => {
        const response = await axios.post(url + "/api/order/verify", { success, orderId })
        if (response.data.success) {
            navigate("/myorders")
        }
        else {
            navigate('/')
        }
    }
    useEffect(() => {
        verifypayment()
    }, [])

    return (
        <div className='min-h-[60vh] grid '>
            <div className='w-[100px] h-[100px] place-self-center border-[5px] border-[#bdbdbd] border-t-red-500 rounded-[50%] animate-spin-custom-fast'>

            </div>
        </div>
    )
}

export default Verify