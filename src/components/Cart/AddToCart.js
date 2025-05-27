import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import CartAmountToggle from "./CartAmountToggle";
import { useNavigate } from "react-router-dom";
import { Button } from "../../styles/Button";
import { useDispatch } from "react-redux";
import { addToCart as addToCartAction } from "../../redux/cartSlice";

const AddToCart = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id, colors, stock } = product;

  const [color, setColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const setDecrease = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };

  const setIncrease = () => {
    amount < stock ? setAmount(amount + 1) : setAmount(stock);
  };
  const handleAdd = () => {
    dispatch(addToCartAction({
      id,
      name: product.name,
      price: product.price,
      image: product.image,
      color,
      quantity: amount,
    }));
    // Navigate to cart after adding item
    navigate('/cart');
  };
  return (
    <Wrapper>
      <div className="product-options">
        <div className="colors">
          <p>
            <span>Color: </span>
            {colors.map((curColor, index) => {
            return (
              <button
                key={index}
                style={{ backgroundColor: curColor }}
                className={color === curColor ? "btnStyle active" : "btnStyle"}
                onClick={() => setColor(curColor)}>
                {color === curColor ? <FaCheck className="checkStyle" /> : null}
              </button>
            );
          })}
        </p>
      </div>
          </div>
      {/* add to cart  */}
      <CartAmountToggle
        amount={amount}
        setDecrease={setDecrease}
        setIncrease={setIncrease}
      />      <Button className="btn" onClick={(e) => {
        e.preventDefault();
        handleAdd();
      }}>
        Add To Cart
      </Button>
    </Wrapper>
  );
};


const Wrapper = styled.section`
  .product-options {
    margin: 2rem 0;
  }

  .colors p {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    
    span {
      margin-right: 1rem;
      font-weight: 600;
    }
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  .amount-toggle {
    margin-top: 3rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.4rem;

    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }

    .amount-style {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.btn};
    }
  }

  .btn {
    margin-top: 2rem;
    background-color: ${({ theme }) => theme.colors.btn || '#3b82f6'};
    color: #fff;
    padding: 1rem 2.5rem;
    border: none;
    border-radius: 0.5rem;
    font-size: 1.6rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-block;
    text-decoration: none;

    &:hover {
      background-color: ${({ theme }) => theme.colors.btn ? `${theme.colors.btn}dd` : '#2563eb'};
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;
export default AddToCart;