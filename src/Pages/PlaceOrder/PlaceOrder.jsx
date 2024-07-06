import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const PlaceOrder = () => {
  const {getTotalCartAmount , token , contextValue , cartItems , url } =useContext(StoreContext); 
  const food_list = contextValue.food_list;

  const [data , setData ] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: ""
  });

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list?.map((item)=>{
      if(cartItems[item._id]> 0 ){
         let itemInfo = item;
         itemInfo['quantity'] = cartItems[item._id];
         orderItems.push(itemInfo);
      }
    })

    console.log(orderItems);


    const orderData = {
      address:data, 
      items: orderItems,
      amount : getTotalCartAmount()+2

    };
    let res = await axios.post(url+'/api/order/place' , orderData , {headers : {token}} );
    if(res.data.success){
      const {session_url} = res.data;
      window.location.replace(session_url );
    }else{
      alert('Error');
    }

    
  }

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data =>({...data, [name]: value }));
  };

  const navigate = useNavigate();
  useEffect(()=>{
    if(!token){
      navigate('/cart');
    }
    else if(getTotalCartAmount()==0 ){
      navigate('/cart');
    }
  },[token])
  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required onChange={onChangeHandler} name="firstName" value={data.firstName} type="text" placeholder="First Name" />
          <input required onChange={onChangeHandler} name="lastName" value={data.lastName} type="text" placeholder="Last Name" />
        </div>
        <input required onChange={onChangeHandler} name="email" value={data.email} type="email" placeholder="Email address" />
        <input required onChange={onChangeHandler} name="street" value={data.street} type="text" placeholder="Street" />
        <div className="multi-fields">
          <input required onChange={onChangeHandler} name="city" value={data.city} type="text" placeholder="City" />
          <input required onChange={onChangeHandler} name="state" value={data.state} type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input required onChange={onChangeHandler} name="zipCode" value={data.zipCode} type="text" placeholder="Zip code" />
          <input required onChange={onChangeHandler} name="country" value={data.country} type="text" placeholder="Country" />
        </div>
        <input required onChange={onChangeHandler} name="phone" value={data.phone} type="text" placeholder="Phone" />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</p>
            </div>
          </div>
          <button type="submit" >
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
