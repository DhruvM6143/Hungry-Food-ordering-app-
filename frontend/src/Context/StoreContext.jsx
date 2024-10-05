import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "https://hungry-food-backend-mu3e.onrender.com";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        toast.success("Added to cart and cart is accessible at the top");

        if (token) {
            try {
                await axios.post(
                    url + "/api/cart/add",
                    { itemId },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                toast.success("Item added to cart.");
            } catch (error) {
                toast.error("Failed to add item to cart.");
                console.error("Error adding to cart:", error);
            }
        }
    };

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            setFoodList(response.data.data);
        } catch (error) {
            toast.error("Failed to load food items. Please try again later.");
            console.error("Error fetching food list:", error);
        }
    };

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(
                url + "/api/cart/get",
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCartItems(response.data.cartData);
        } catch (error) {
            toast.error("Failed to load cart data.");
            console.error("Error loading cart data:", error);
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        toast.success("Removed from cart");

        if (token) {
            try {
                await axios.post(
                    url + "/api/cart/remove",
                    { itemId },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                toast.success("Item removed from cart.");
            } catch (error) {
                toast.error("Failed to remove item from cart.");
                console.error("Error removing from cart:", error);
            }
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        const foodMap = new Map(food_list.map((item) => [item._id, item]));

        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = foodMap.get(item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    useEffect(() => {
        async function loadData() {
            try {
                await fetchFoodList();
                const savedToken = localStorage.getItem("token");
                if (savedToken) {
                    setToken(savedToken);
                    await loadCartData(savedToken);
                }
            } catch (error) {
                console.error("Error loading data:", error);
            }
        }
        loadData();
    }, []);

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token); // Save token when it changes
        }
    }, [token]);

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
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
