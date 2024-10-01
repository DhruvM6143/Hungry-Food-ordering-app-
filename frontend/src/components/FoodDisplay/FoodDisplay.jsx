import React, { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItems/FoodItem'

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext)
    return (
        <div className='mt-[30px] '>
            <h2 className='font-bold font-[max(2vw,24px)] text-[30px]'>Top Dishes Near You</h2>
            <div className='grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] mt-[30px] gap-[30px] gap-y-[50px]'>
                {
                    food_list.map((item, index) => {
                        if (category === "All" || category === item.category) {

                            return (
                                <FoodItem key={index} name={item.name} price={item.price} image={item.image} description={item.description} id={item._id} />
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}

export default FoodDisplay