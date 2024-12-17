import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = "https://hungry-food-backend-mu3e.onrender.com"
    const [token, setToken] = useState("")

    const [food_list, setFoodList] = useState([]);

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
            toast.success("Added to cart and cart is accessible at the top")
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
            toast.success("Added to cart and cart is accessible at the top")
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
        }
    }
    const fetchFoodList = async (foodList) => {
        const response = await axios.get(url + "/api/food/list")
        setFoodList(response.data.data)
    }
    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } })
        setCartItems(response.data.cartData);
    }
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        toast.success("removed from cart")
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } })
            toast.success("removed from cart")
        }

    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {

                let itemInfo = food_list.find((pro) => pro._id === item)
                totalAmount += itemInfo.price * cartItems[item]
            }
        }
        return totalAmount;
    }

    useEffect(() => {

        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem('token')) {
                setToken(localStorage.getItem('token'));
                await loadCartData(localStorage.getItem('token'));
            }
        }
        loadData()
    }, [])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;
