import { CartItemDetails } from './CartItemDetails';
import { DeliveryOptions } from './DeliveryOptions';
import { DeliveryDate } from './DeliveryDate';

export function OrderSummary({cart, deliveryOptions, loadCart}){
  return (
    <div className="order-summary">
      {
        deliveryOptions.length > 0 &&
        cart.map((cartItem)=>{

          const selectedDeliveryOption = deliveryOptions
            .find((deliveryOption)=>{
              return deliveryOption.id === cartItem.deliveryOptionId;
          });
          return (
            <div className="cart-item-container" key={cartItem.productId}>
              <DeliveryDate 
                selectedDeliveryOption={selectedDeliveryOption}
              />

              <div className="cart-item-details-grid">
                <CartItemDetails cartItem={cartItem} />

                <DeliveryOptions cartItem={cartItem} deliveryOptions={deliveryOptions} loadCart={loadCart} />
              </div>
            </div>
          )
        })
      }
    </div>
  )
}