import axios from 'axios';
import { useState, useEffect, Fragment } from 'react';
import './OrdersPage.css';
import {Header} from '../../components/Header';
import { OrdersGrid } from './OrdersGrid';


export function Orders({cart, loadCart}){
  const [orders, setOrders] = useState([]);
  useEffect(()=>{
    const fetchData = async ()=>{
      const response = await axios.get('/api/orders?expand=products');
      setOrders(response.data);
    }
    fetchData();
  },[]);
  return (
    <>
      <link rel="icon" href="orders-favicon.png"/>
      <title>Orders</title>
      <Header cart={cart}/>

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {
            orders.map((order)=>{
              return(
                <OrdersGrid order={order} loadCart={loadCart} />
              );
            })
          }
        </div>
      </div>
    </>
  )
}