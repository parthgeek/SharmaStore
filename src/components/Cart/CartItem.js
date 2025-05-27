import React from "react";
import FormatPrice from "../../Helpers/FormatPrice";
import CartAmountToggle from "./CartAmountToggle";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeFromCart, addToCart } from "../../redux/cartSlice";

const CartItem = ({ id, name, image, color, price, quantity, totalPrice }) => {
  const dispatch = useDispatch();

  console.log({ image }, "here is the image");

  return (
    <div className="cart_heading grid grid-five-column">
      <div className="cart-image--name">
        <figure>
{Array.isArray(image) ? (
  image.map((img, index) => (
    <img key={index} src={img.url || img} alt={name} />
  ))
) : (
  <img src={image} alt={name} />
)}

       


        </figure>
        <div>
          <p>{name}</p>
          <div className="color-div">
            <p>Color:</p>
            <div
              className="color-style"
              style={{ backgroundColor: color }}
            ></div>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="cart-hide">
        <p>
          <FormatPrice price={price} />
        </p>
      </div>

      {/* Quantity */}
      <CartAmountToggle
        amount={quantity}
        setDecrease={() => dispatch(removeFromCart(id))}
        setIncrease={() =>
          dispatch(addToCart({ id, name, image, color, price, quantity: 1 }))
        }
      />

      {/* Subtotal */}
      <div className="cart-hide">
        <p>
          <FormatPrice price={totalPrice} />
        </p>
      </div>

      {/* Remove */}
      <div>
        <FaTrash
          className="remove_icon"
          onClick={() => dispatch(removeFromCart(id))}
        />
      </div>
    </div>
  );
};

export default CartItem;
