import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";


export const StoreContext= createContext(null);
const StoreContextProvider = (props)=>{
    const [cartItems , setCartItems] = useState({});

    const addToCart = (itemId) =>{
        if(!cartItems[itemId]){
            setCartItems(prev=>({...prev, [itemId]:1})) 
        }else{
        setCartItems(prev=>({...prev, [itemId]:prev[itemId]+1}))
        }
    }

    const removeFromCart = (itemId) =>{
        setCartItems(prev=>({...prev, [itemId]:prev[itemId]-1}))
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
    
    const contextValue = {
        food_list  
    }
    return(
        <StoreContext.Provider value={{contextValue , cartItems ,setCartItems ,addToCart ,removeFromCart ,getTotalCartAmount }}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;