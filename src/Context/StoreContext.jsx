import axios, { AxiosHeaders } from "axios";
import { createContext, useEffect, useState } from "react";


export const StoreContext= createContext(null);
const StoreContextProvider = (props)=>{
    const [cartItems , setCartItems] = useState({});
    const url = 'https://food-delivery-backend-vert.vercel.app'
    const [token , setToken] = useState(''); 
    const[food_list , setFoodList] = useState([]);

    const addToCart =async (itemId) =>{
        if(!cartItems[itemId]){
            setCartItems(prev=>({...prev, [itemId]:1})) 
        }else{
        setCartItems(prev=>({...prev, [itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+'/api/cart/add',{itemId}, {headers: {token}});
        }
    }

    const removeFromCart =async (itemId) =>{
        setCartItems(prev=>({...prev, [itemId]:prev[itemId]-1}));
        
        if(token){
            await axios.post(url+'/api/cart/remove',{itemId}, {headers: {token}});
        }
    }

    const getTotalCartAmount = ()=>{
        let total = 0;
        for(let item in cartItems){
            if(cartItems[item]>0){
                let iteminfo =food_list.find((product)=> product._id === item)
                total += iteminfo.price*cartItems[item];
            }
        }
        return total;
    }

    const fetchFoodList =async ()=>{
        const res = await axios.get(url+'/api/food/list');
        setFoodList(res.data.data);
    }

    const loadCartData = async(token)=>{
        const res = await axios.get(url+'/api/cart/get' , {headers:{token}});
        setCartItems(res.data.cartData)
    } 
    useEffect(()=>{
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            } else {
                setToken('');
            }
        }
        loadData();
        
      },[])
    
    const contextValue = {
        food_list  
    }
    return(
        <StoreContext.Provider value={{token , setToken, url , contextValue , cartItems ,setCartItems ,addToCart ,removeFromCart ,getTotalCartAmount }}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;