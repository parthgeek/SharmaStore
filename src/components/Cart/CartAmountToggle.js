import React from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import styled from 'styled-components';

const CartAmountToggle = ({ amount, setDecrease, setIncrease }) => {
  return (
    <Wrapper>
      <div className="cart-button">
        <div className="amount-toggle">
          <button onClick={setDecrease}>
            <FaMinus />
          </button>
          <div className="amount-style">{amount}</div>
          <button onClick={setIncrease}>
            <FaPlus />
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .cart-button {
    width: 100%;
    margin-top: 2rem;
  }

  .amount-toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.4rem;
    font-size: 1.8rem;

    button {
      border: none;
      background-color: transparent;
      cursor: pointer;
      padding: 0.8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${({ theme }) => theme.colors.btn || '#3b82f6'};
      transition: all 0.3s ease;

      &:hover {
        color: ${({ theme }) => (theme.colors.btn ? `${theme.colors.btn}dd` : '#2563eb')};
        transform: scale(1.1);
      }

      svg {
        font-size: 1.6rem;
      }
    }

    .amount-style {
      font-size: 2.4rem;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.text || '#333'};
    }
  }
`;

export default CartAmountToggle;