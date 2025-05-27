import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FiShoppingCart } from "react-icons/fi";
import { CgMenu, CgClose } from "react-icons/cg";

const Nav = () => {
  const [menuIcon, setMenuIcon] = useState(false);

  return (
    <NavWrapper>
      <div className={menuIcon ? "navbar active" : "navbar"}>
        <ul className="navbar-lists">
          <li>
            <NavLink to="/Home" className="navbar-link" onClick={() => setMenuIcon(false)}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className="navbar-link" onClick={() => setMenuIcon(false)}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/Products" className="navbar-link" onClick={() => setMenuIcon(false)}>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="navbar-link" onClick={() => setMenuIcon(false)}>
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" className="navbar-link cart-trolley--link" onClick={() => setMenuIcon(false)}>
              <FiShoppingCart className="cart-trolley" />
              <span className="cart-total--item">10</span>
            </NavLink>
          </li>
        </ul>

        {/* Mobile menu toggle buttons */}
        <div className="mobile-navbar-btn">
          <CgMenu
            name="menu-outline"
            className="mobile-nav-icon"
            onClick={() => setMenuIcon(true)}
          />
          <CgClose
            name="close-outline"
            className="mobile-nav-icon close-outline"
            onClick={() => setMenuIcon(false)}
          />
        </div>
      </div>
    </NavWrapper>
  );
};

const NavWrapper = styled.nav`
  .navbar-lists {
    display: flex;
    gap: 3rem;
    align-items: center;
    list-style: none;

    .navbar-link {
      text-decoration: none;
      font-size: 1.6rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.black};
      position: relative;
      transition: all 0.3s ease;

      &:hover {
        color: ${({ theme }) => theme.colors.primary};
      }

      &::after {
        content: "";
        position: absolute;
        width: 0%;
        height: 2px;
        bottom: -4px;
        left: 0;
        background-color: ${({ theme }) => theme.colors.primary};
        transition: width 0.3s ease;
      }

      &:hover::after {
        width: 100%;
      }
    }

    .cart-trolley--link {
      position: relative;

      .cart-trolley {
        font-size: 2.4rem;
      }

      .cart-total--item {
        width: 1.8rem;
        height: 1.8rem;
        position: absolute;
        top: -10px;
        left: 18px;
        background: ${({ theme }) => theme.colors.primary};
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
      }
    }
  }

  .mobile-navbar-btn {
    display: none;
    background: none;
    border: none;
    cursor: pointer;

    .mobile-nav-icon {
      font-size: 3rem;
      color: ${({ theme }) => theme.colors.black};
    }

    .close-outline {
      display: none;
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .mobile-navbar-btn {
      display: block;
      z-index: 9999;

      .mobile-nav-icon {
        display: block;
      }

      .close-outline {
        display: ${props => (props.menuIcon ? "block" : "none")};
      }
    }

    .navbar-lists {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: fixed;
      top: 0;
      right: -100%;
      width: 100vw;
      height: 100vh;
      background: white;
      transition: right 0.3s ease-in-out;
    }

    .navbar.active .navbar-lists {
      right: 0;
    }

    .navbar-link {
      font-size: 2.4rem;
    }

    .cart-trolley {
      font-size: 3rem;
    }
  }
`;

export default Nav;
