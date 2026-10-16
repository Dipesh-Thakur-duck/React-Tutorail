import { formatMoney } from "../../utils/money";
import { useState } from "react";
import axios from 'axios';

export function CartItemDetails({ cartItem, loadCart }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  async function toggleUpdating() {
    if (isUpdating) {
      // second click: save and close
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity: Number(quantity)
      });
      await loadCart();
      setIsUpdating(false);
    } else {
      // first click: open the input
      setIsUpdating(true);
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      toggleUpdating();
    } else if (event.key === 'Escape') {
      setQuantity(cartItem.quantity);
      setIsUpdating(false);
    }
  }

  return (
    <>
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:{' '}
            {isUpdating && (
              <input
                type="text"
                className="update-box"
                style={{ width: '50px' }}
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                onKeyDown={handleKeyDown}
              />
            )}
            <span className="quantity-label">{cartItem.quantity}</span>
          </span>
          <span className="update-quantity-link link-primary" onClick={toggleUpdating}>
            Update
          </span>
          <span className="delete-quantity-link link-primary" onClick={deleteCartItem}>
            Delete
          </span>
        </div>
      </div>
    </>
  );
}