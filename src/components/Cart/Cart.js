import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "./CartItem";
import { NavLink } from "react-router-dom";
import { Button } from "../../styles/Button";
import FormatPrice from "../../Helpers/FormatPrice";
import { clearCart } from "../../redux/cartSlice"; // path may vary

const Cart = () => {
  const dispatch = useDispatch();
  const { items: cart, totalAmount: total_price, shipping_fee = 0 } = useSelector((state) => state.cart);
  console.log({cart});

  if (cart.length === 0) {
    return (
      <EmptyDiv>
        <h3>No Cart Items</h3>  
      </EmptyDiv>
    );
  }

  return (
    <Wrapper>
      <div className="container">
        <div className="cart_heading grid grid-five-column">
          <p>Item</p>
          <p className="cart-hide">Price</p>
          <p>Quantity</p>
          <p className="cart-hide">Subtotal</p>
          <p>Remove</p>
        </div>
        <hr />
        <div className="cart-item">
          {cart.map((curElem) => (
            <CartItem key={`${curElem.id}-${curElem.color}`} {...curElem} />
          ))}
        </div>
        <hr />
        <div className="cart-two-button">
          <NavLink to="/products">
            <Button>Continue Shopping</Button>
          </NavLink>
          <Button className="btn btn-clear" onClick={() => dispatch(clearCart())}>
            Clear Cart
          </Button>
        </div>

        <div className="order-total--amount">
          <div className="order-total--subdata">
            <div>
              <p>Subtotal:</p>
              <p><FormatPrice price={total_price} /></p>
            </div>
            <div>
              <p>Shipping Fee:</p>
              <p><FormatPrice price={shipping_fee} /></p>
            </div>
            <hr />
            <div>
              <p>Order Total:</p>
              <p><FormatPrice price={shipping_fee + total_price} /></p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const EmptyDiv = styled.div`
  display: grid;
  place-items: center;
  height: 50vh;

  h3 {
    font-size: 4.2rem;
    text-transform: capitalize;
    font-weight: 300;
  }
`;

const Wrapper = styled.section`
  padding: 6rem 0;
  background-color: #f9f9f9;

  .container {
    background: white;
    border-radius: 1rem;
    padding: 3rem;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
    max-width: 1200px;
    margin: 0 auto;
  }

  .cart_heading {
    font-size: 1.4rem;
    font-weight: 600;
    color: #555;
    text-transform: uppercase;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eaeaea;
  }

  .cart-item {
    padding: 2rem 0;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  .cart-image--name {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    img {
      width: 70px;
      height: 70px;
      object-fit: contain;
      border-radius: 0.5rem;
      background: #fff;
      border: 1px solid #eee;
    }
    p {
      font-weight: 500;
      font-size: 1.2rem;
    }
  }

  .color-div {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-top: 0.5rem;

    p {
      font-size: 1rem;
    }

    .color-style {
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
      border: 1px solid #ccc;
    }
  }

  .amount-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;

    button {
      padding: 0.5rem 1rem;
      background: #eee;
      border: none;
      font-size: 1.4rem;
      cursor: pointer;
      border-radius: 0.4rem;
      transition: background 0.3s ease;
    }

    button:hover {
      background: #ddd;
    }

    .amount-style {
      font-weight: bold;
      font-size: 1.4rem;
    }
  }

  .remove_icon {
    color: #e74c3c;
    font-size: 1.5rem;
    cursor: pointer;
    transition: color 0.3s;
  }

  .remove_icon:hover {
    color: #c0392b;
  }

  .cart-two-button {
    margin-top: 3rem;
    display: flex;
    justify-content: space-between;

    .btn {
      padding: 0.8rem 2.4rem;
      font-size: 1.2rem;
      border-radius: 0.5rem;
      text-transform: uppercase;
      font-weight: bold;
    }

    .btn-clear {
      background-color: #e74c3c;
      color: white;
      border: none;
      transition: background 0.3s ease;
    }

    .btn-clear:hover {
      background-color: #c0392b;
    }
  }

  .order-total--amount {
    margin-top: 4rem;
    display: flex;
    justify-content: flex-end;

    .order-total--subdata {
      width: 100%;
      max-width: 400px;
      background: #fafafa;
      padding: 2rem;
      border-radius: 0.8rem;
      border: 1px solid #ddd;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      div {
        display: flex;
        justify-content: space-between;
        font-size: 1.2rem;

        p:last-child {
          font-weight: bold;
          color: #2c3e50;
        }
      }

      div:last-child {
        background-color: #f1f1f1;
        padding: 0.8rem;
        border-radius: 0.4rem;
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .cart_heading,
    .grid-five-column {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .cart-two-button {
      flex-direction: column;
      gap: 1rem;
    }

    .order-total--amount {
      justify-content: center;
    }
  }
`;
export default Cart;