import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../styles/Button";
import { useEffect, useState } from "react";

const HeroSection = ({ myData }) => {
  const { name } = myData;
  const [isVisible, setIsVisible] = useState(false);
  const [isNameVisible, setIsNameVisible] = useState(false);
  
  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);
    
    // Delay the name animation for a more dramatic effect
    const nameTimer = setTimeout(() => {
      setIsNameVisible(true);
    }, 400);
    
    return () => clearTimeout(nameTimer);
  }, []);

  return (
    <Wrapper>
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      <div className="container">
        <div className={`grid grid-two-column ${isVisible ? "animate" : ""}`}>
          <div className="hero-section-data">
            <p className="intro-data">Welcome to</p>
            <div className="store-name-container">
              <h1 className={`store-name ${isNameVisible ? "animate-name" : ""}`}>{name}</h1>
              <span className={`name-accent ${isNameVisible ? "animate-accent" : ""}`}></span>
            </div>
            <p className="description">
              Discover amazing products handpicked just for you. Dive into our latest collections and find your next favorite!
            </p>
            <div className="cta-container">
              <NavLink to="/products">
                <Button className="shop-btn">Shop Now</Button>
              </NavLink>
            </div>
            <div className="trust-badges">
              <div className="badge">
                <span className="icon">✓</span>
                <span>Premium Quality</span>
              </div>
              <div className="badge">
                <span className="icon">🚚</span>
                <span>Fast Delivery</span>
              </div>
              <div className="badge">
                <span className="icon">💯</span>
                <span>Satisfaction Guaranteed</span>
              </div>
            </div>
          </div>
          <div className="hero-section-image">
            <figure>
              <div className="img-container">
                <img
                  src={process.env.PUBLIC_URL + "/images/hero.jpg"}
                  alt="hero-section-photo"
                  className="img-style"
                />
              </div>
              <div className="floating-label">
                <div className="label-content">
                  <span className="highlight">New</span>
                  <span>Collection</span>
                </div>
              </div>
            </figure>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: relative;
  overflow: hidden;
  background: linear-gradient(
    135deg,
    rgba(55, 26, 242, 0.9),
    rgba(55, 26, 242, 0.4)
  );
  padding: 12rem 0;
  color: #fff;
  
  .background-shapes {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 0;
    overflow: hidden;
  }
  
  .shape {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(5px);
  }
  
  .shape-1 {
    top: -15%;
    right: -10%;
    width: 40rem;
    height: 40rem;
    animation: float 12s infinite ease-in-out;
  }
  
  .shape-2 {
    bottom: -20%;
    left: -5%;
    width: 30rem;
    height: 30rem;
    animation: float 15s infinite ease-in-out reverse;
  }
  
  .shape-3 {
    top: 40%;
    right: 25%;
    width: 20rem;
    height: 20rem;
    animation: float 10s infinite ease-in-out 2s;
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0) scale(1);
    }
    50% {
      transform: translateY(-20px) scale(1.05);
    }
  }

  .container {
    position: relative;
    z-index: 1;
    max-width: 120rem;
    margin: 0 auto;
    padding: 0 3.2rem;
  }
  
  .grid-two-column {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    gap: 6rem;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out;
    
    &.animate {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .hero-section-data {
    max-width: 54rem;
    
    .intro-data {
      font-size: 1.8rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.2rem;
      margin-bottom: 1.5rem;
      color: rgba(255, 255, 255, 0.9);
      position: relative;
      display: inline-block;
      padding-left: 3rem;
      
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        width: 2rem;
        height: 2px;
        background-color: rgba(255, 255, 255, 0.9);
      }
    }
    
    h1.store-name {
      font-size: 6rem;
      line-height: 1.1;
      font-weight: 800;
      margin-bottom: 2.5rem;
      text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      background: linear-gradient(to right, #fff, #e8e4ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: inline-block;
      position: relative;
      letter-spacing: 1px;
      padding: 0 1rem;
      opacity: 0;
      transform: translateY(20px) scale(0.95);
      transition: all 0.6s ease;
      
      &.animate-name {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      
      &::after {
        content: "™";
        position: absolute;
        top: 8px;
        right: -5px;
        font-size: 2rem;
        color: #b8a6ff;
        -webkit-text-fill-color: #b8a6ff;
      }
    }
    
    .store-name-container {
      position: relative;
      margin-bottom: 2.5rem;
      display: inline-block;
    }
    
    .name-accent {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 1rem;
      background: linear-gradient(90deg, rgba(136, 84, 255, 0.7) 0%, rgba(55, 26, 242, 0.5) 100%);
      z-index: -1;
      transform: translateY(1rem) skewX(-15deg);
      border-radius: 1rem;
      transition: width 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s;
      
      &.animate-accent {
        width: 100%;
      }
    }
    
    .description {
      font-size: 1.8rem;
      margin-bottom: 3.5rem;
      line-height: 1.7;
      color: rgba(255, 255, 255, 0.9);
      font-weight: 400;
    }
    
    .cta-container {
      display: flex;
      align-items: center;
      gap: 2rem;
      margin-bottom: 4rem;
    }
    
    .shop-btn {
      padding: 1.6rem 3.2rem;
      font-size: 1.8rem;
      font-weight: 500;
      background-color: #fff;
      color: rgba(55, 26, 242, 0.9);
      border-radius: 5rem;
      border: none;
      box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.15);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      z-index: 1;
      
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0;
        background-color: rgba(55, 26, 242, 0.1);
        transition: all 0.3s ease;
        z-index: -1;
      }
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 1.5rem 3rem rgba(0, 0, 0, 0.2);
        
        &::after {
          height: 100%;
        }
      }
      
      &:active {
        transform: translateY(-2px);
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
      }
    }
    
    .explore-link {
      font-size: 1.7rem;
      color: #fff;
      text-decoration: none;
      font-weight: 500;
      position: relative;
      padding-bottom: 0.5rem;
      
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background-color: #fff;
        transition: all 0.3s ease;
      }
      
      &:hover::after {
        width: 100%;
      }
    }
    
    .trust-badges {
      display: flex;
      gap: 2.5rem;
      margin-top: 1rem;
      
      .badge {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        font-size: 1.5rem;
        color: rgba(255, 255, 255, 0.9);
        
        .icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.4rem;
          height: 2.4rem;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          font-size: 1.2rem;
        }
      }
    }
  }
  
  .hero-section-image {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    
    figure {
      position: relative;
      width: 100%;
      max-width: 48rem;
      
      .img-container {
        position: relative;
        overflow: hidden;
        border-radius: 1.5rem;
        box-shadow: 0 2rem 4rem rgba(0, 0, 0, 0.25);
        transform: rotate(2deg);
        transition: all 0.5s ease;
        
        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom right,
            rgba(255, 255, 255, 0.1),
            rgba(0, 0, 0, 0.2)
          );
          z-index: 1;
        }
        
        &:hover {
          transform: scale(1.02) rotate(0);
        }
      }
      
      .floating-label {
        position: absolute;
        bottom: 3rem;
        left: -3rem;
        background: #fff;
        padding: 1.2rem 2rem;
        border-radius: 1rem;
        box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.15);
        transform: rotate(-5deg);
        z-index: 2;
        animation: float-label 5s infinite ease-in-out;
        
        .label-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          
          span {
            font-size: 1.4rem;
            font-weight: 500;
            color: #333;
            line-height: 1.4;
            
            &.highlight {
              font-size: 2.2rem;
              font-weight: 700;
              color: rgba(55, 26, 242, 1);
            }
          }
        }
      }
    }
  }
  
  .img-style {
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  @keyframes float-label {
    0%, 100% {
      transform: rotate(-5deg) translateY(0);
    }
    50% {
      transform: rotate(-7deg) translateY(-10px);
    }
  }
  
  @media (max-width: ${({ theme }) => theme.media.tab}) {
    padding: 10rem 0;
    
    .grid-two-column {
      gap: 4rem;
    }
    
    .hero-section-data {
      h1.store-name {
        font-size: 4.5rem;
      }
      
      .description {
        font-size: 1.7rem;
      }
      
      .trust-badges {
        flex-wrap: wrap;
        gap: 1.5rem;
      }
    }
    
    .hero-section-image figure {
      max-width: 42rem;
    }
  }
  
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 8rem 0;
    
    .grid-two-column {
      grid-template-columns: 1fr;
      gap: 6rem;
    }
    
    .hero-section-data {
      text-align: center;
      
      .intro-data {
        padding-left: 0;
        
        &::before {
          display: none;
        }
      }
      
      h1.store-name {
        font-size: 3.8rem;
      }
      
      .description {
        font-size: 1.6rem;
      }
      
      .cta-container {
        justify-content: center;
        flex-wrap: wrap;
      }
      
      .trust-badges {
        justify-content: center;
        flex-wrap: wrap;
      }
    }
    
    .hero-section-image {
      order: -1;
      
      figure {
        max-width: 32rem;
        margin: 0 auto;
        
        .floating-label {
          bottom: 2rem;
          left: 0;
          transform: rotate(-3deg);
        }
      }
    }
  }
`;

export default HeroSection;