import React, { useState, useEffect } from "react";
import styled from "styled-components";

const MyImage = ({ imgs = [] }) => {
  const [mainImage, setMainImage] = useState(0);

  // Handle different image data formats
  const processImages = (imageData) => {
    if (!imageData) return [];
    
    // If it's already an array
    if (Array.isArray(imageData)) {
      return imageData.map((img, index) => ({
        id: index,
        url: typeof img === 'string' ? img : img?.url || ''
      }));
    }
    
    // If it's a single string URL
    if (typeof imageData === 'string') {
      return [{ id: 0, url: imageData }];
    }
    
    // If it's a single object with url
    if (typeof imageData === 'object' && imageData.url) {
      return [{ id: 0, url: imageData.url }];
    }
    
    return [];
  };

  const processedImages = processImages(imgs);

  if (!processedImages || processedImages.length === 0) {
    return (
      <Wrapper>
        <div className="no-image">
          <p>No image available</p>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="grid grid-four-column">
        {processedImages.map((curElm, index) => (
          <figure 
            key={curElm.id || index}
            className={mainImage === index ? "active" : ""}
          >
            <img
              src={curElm.url}
              alt={`product ${index + 1}`}
              className="box-image--style"
              onClick={() => setMainImage(index)}
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "images/logo.png";
              }}
            />
          </figure>
        ))}
      </div>

      <div className="main-screen">
        <img 
          src={processedImages[mainImage]?.url} 
          alt="selected product" 
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "images/logo.png";
          }}
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  gap: 1rem;
  
  .grid {
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    gap: 0.5rem;
    align-items: center;
    justify-items: center;
  }

  figure {
    width: 100%;
    height: 100%;
    max-height: 10rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 0.5rem;
    padding: 0.5rem;
    transition: all 0.3s ease;
    background-color: #fff;
    
    &.active {
      border: 2px solid ${({ theme }) => theme.colors.btn || '#3b82f6'};
      transform: scale(1.05);
    }
    
    &:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      border-radius: 0.3rem;
    }
  }

  .main-screen {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background-color: #fff;
    border-radius: 0.5rem;
    
    img {
      max-width: 100%;
      max-height: 40rem;
      object-fit: contain;
      border-radius: 0.3rem;
    }
  }

  .no-image {
    width: 100%;
    height: 40rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f8fafc;
    border-radius: 0.5rem;
    
    p {
      color: #94a3b8;
      font-size: 1.6rem;
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    
    .grid {
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: 1fr;
      gap: 1rem;
    }
    
    figure {
      max-height: 8rem;
    }
  }
`;

export default MyImage;