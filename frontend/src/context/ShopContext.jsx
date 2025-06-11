import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) =>
{
    const currency = '₽';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [promotions, setPromotions] = useState([]);
    const [token, setToken] = useState('');
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    const addToCart = async (itemId, size)=>{
        try {
            
            if (!size) {
                size='M'
             }
             console.log(itemId);
            console.log(size);
             let cartData = structuredClone(cartItems);
             console.log(cartData);
             
             if (cartData[itemId]) {
                 if (cartData[itemId][size]) {
                     //cartData[itemId][size] +=1;
                 }
                 else
                 {
                     cartData[itemId][size] = 1;
                 }            
             }
             else{
                 cartData[itemId] = {};
                 cartData[itemId][size] = 1;
             }
             setCartItems(cartData);
             console.log(token);
             
             if (token) {
                 try {                     
                     await axios.post(backendUrl+'/api/cart/add',{itemId, size},{headers:{token}})
                 } catch (error) {
                     console.log(error);
                     toast(error.message);                
                 }
             }
        } catch (error) {
            console.log(error);

            
        }
        
    }

    const getCartCount = ()=>{
        let totalCount = 0;
        for(const items in cartItems)
        {
            for(const item in cartItems[items])
            {
                try {
                    if (cartItems[items][item]>0) {
                        totalCount +=cartItems[items][item];                        
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async(itemId, size, quantity) =>{
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;

        setCartItems(cartData);
        try {
            if (token) {
                await axios.post(backendUrl + '/api/cart/update', {itemId, size, quantity}, {headers:{token}})
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getCartAmount = () =>{
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product)=> product._id === items);
            for(const item in cartItems[items])
            {
                try {
                    if (cartItems[items][item]>0) {
                        totalAmount +=itemInfo.price* cartItems[items][item];
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalAmount;
    }

    const getProductsData = async()=>{
        try {
            const response = await axios.get(backendUrl+"/api/product/list");
            if(response.data.success)
            {
                setProducts(response.data.products)
            }else{
                toast.error(response.data.message)
            }           
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getUserCart = async (token)=>{
        try {
            
            const response =await axios.post(backendUrl+'/api/cart/get',{},{headers:{token}})            
            if (response.data.success) {
                setCartItems(response.data.cartData)                
            }
        } catch (error) {
            console.log(error);
            
            toast.error(error.message)
        }
    }

    const getActivePromotions = async ()=>{
        try {
            const response = await axios.get(backendUrl+"/api/promotion/active");            
            if(response.data.success)
            {
                let activePromotions =  response.data.promotions.find((promotion)=> promotion.active === true);
                setPromotions(response.data.promotions)
            }else{
                toast.error(response.data.message)
            }    
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getCategories = async()=>{
        try {
            const response = await axios.post(backendUrl+'/api/category/list',{},{headers:{token}})            
            if(response.data.success)
            {                
                setCategories(response.data.categories)
            }else{
                toast.error(response.data.message)
            }
            
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getProductsData();
        getActivePromotions();
        getCategories();
    },[])

    useEffect(()=>{
        if (!token && localStorage.getItem('token'))
        {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    })

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart,setCartItems,
        getCartCount,updateQuantity,
        getCartAmount,navigate,
        backendUrl,token,setToken,
        promotions,categories
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;