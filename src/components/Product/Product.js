import React from "react";
import { NavLink } from "react-router-dom";
import FormatPrice from "../../Helpers/FormatPrice";
const Product = (currElem) => {
    // destructuring
    const { id, name, image, price, category } = currElem;
    
    // Debug: Log the image data to see its structure
    console.log('Product image data:', image, 'Type:', typeof image);
    
    // Handle different image formats from Supabase
    const getImageUrl = (imageData) => {
        console.log('Processing image data:', imageData);
        
        if (!imageData) return '/placeholder-image.jpg';
        
        // If it's already a string URL
        if (typeof imageData === 'string') {
            console.log('Image is string:', imageData);
            return imageData;
        }
        
        // If it's an array, get the first image
        if (Array.isArray(imageData) && imageData.length > 0) {
            const firstImage = imageData[0]?.url || imageData[0] || '';
            console.log('Image from array:', firstImage);
            return firstImage;
        }
        
        // If it's an object with url property
        if (typeof imageData === 'object' && imageData.url) {
            console.log('Image from object.url:', imageData.url);
            return imageData.url;
        }
        
        // If it's an object, try to get the first property value
        if (typeof imageData === 'object') {
            const values = Object.values(imageData);
            if (values.length > 0) {
                const firstValue = values[0];
                if (typeof firstValue === 'string') {
                    console.log('Image from object value:', firstValue);
                    return firstValue;
                } else if (firstValue?.url) {
                    console.log('Image from nested object.url:', firstValue.url);
                    return firstValue.url;
                }
            }
        }
        
        console.log('No valid image found, using placeholder');
        return '/placeholder-image.jpg';
    };

    return (
        <NavLink to={`/singleproduct/${id}`}>
            <div className="card">
                <figure>
                    <img 
                        src={getImageUrl(image)} 
                        alt={name || 'Product'} 
                        onError={(e) => {
                            console.log('Image failed to load:', e.target.src);
                            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                        }}
                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                    />
                    <figcaption className="caption">{category}</figcaption>
                </figure>
           
                <div className="card-data">
                    <div className="card-data-flex">
                        <h3>{name}</h3>
                        <p className="card-data-price"><FormatPrice price={price}/></p>
                    </div>       
                </div>
            </div>
        </NavLink>
    );
};


export default Product;