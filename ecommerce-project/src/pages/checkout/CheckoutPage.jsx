import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';
import './CheckoutPage.css';
import './CheckoutHeader.css';
import { CheckoutHeader } from './CheckoutHeader';
export function CheckoutPage({cart}){
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(()=>{

    const fetchDeliveryDate = async ()=>{
      const response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
      setDeliveryOptions(response.data);
    }
    fetchDeliveryDate();

    const fetchPaymentData = async ()=>{
      const response = await axios.get('/api/payment-summary');
      setPaymentSummary(response.data);
    }
    fetchPaymentData();
    
  },[])
  return (
    <>
      <link rel="icon" href="cart-favicon.png" />
      <title>Checkout</title> 

      <CheckoutHeader />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">

          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />

          {paymentSummary && (
            <PaymentSummary paymentSummary={paymentSummary} />
          )}
          
        </div>
      </div>
    </>
  )
}