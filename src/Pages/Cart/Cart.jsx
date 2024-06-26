import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
const Cart = () => {
  const {cartItems , contextValue , removeFromCart} = useContext(StoreContext);
console.log(cartItems);
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {
          contextValue?.food_list.map((item, index)=>{
            if(cartItems[item._id]>0){
              return(
               <>
               <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>{item.price*cartItems[item._id]}</p>
                  <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>
                </div>
                <hr />
                </>)
            }
          })
        }
      </div>
    </div>
  )
}

export default Cart
