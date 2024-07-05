import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

const Verify = () => {
    const [searchParams , setSearchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async()=>{
        const res = await axios.post(url+'/api/order/verify',{success,orderId});
        console.log(res.data.success);
        if(res.data.success){
            navigate('/myorders')
        }else{
            navigate('/')
        }
    }
    
    useEffect(()=>{
        verifyPayment();
    },[])
    // if (success === 'true') {
    //     toast.success(`Order ${orderId} has been verified successfully!`);
    // } else {
    //     toast.error(`Failed to verify order ${orderId}. Please try again.`);
    // } 

  return (
    <div className='verify'>
        <div className="spinner">

        </div>
    </div>
  )
}

export default Verify
