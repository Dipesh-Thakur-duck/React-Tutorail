import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import logo from '../../assets/images/logo.png';
import mobileLogo from '../../assets/images/mobile-logo.png';
import checkoutLockIcon from '../../assets/images/icons/checkout-lock-icon.png';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';
import './CheckoutPage.css';
import './CheckoutHeader.css';
export function CheckoutPage({cart}){
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(()=>{
    axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
      .then((response)=>{
        setDeliveryOptions(response.data);
      });
    axios.get('/api/payment-summary')
      .then((response)=>{
        setPaymentSummary(response.data);
      })
  },[])
  return (
    <>
      <link rel="icon" href="cart-favicon.png" />
      <title>Checkout</title> 

      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link to="/">
              <img className="logo" src={logo} />
              <img className="mobile-logo" src={mobileLogo} />
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (<Link className="return-to-home-link"
              to="/">3 items</Link>)
          </div>

          <div className="checkout-header-right-section">
            <img src={checkoutLockIcon} />
          </div>
        </div>
      </div>

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