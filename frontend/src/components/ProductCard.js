import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const discountedPrice = product.promotion > 0
    ? product.price * (1 - product.promotion / 100)
    : product.price;

  return (
    <div className="product-card">
      <div className="product-image">
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <div className="product-image-placeholder">No Image</div>
        )}
        {product.promotion > 0 && (
          <span className="product-badge">-{product.promotion}%</span>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description || 'No description'}</p>
        <div className="product-category">
          Category: {product.category?.name || 'Uncategorized'}
        </div>
        <div className="product-footer">
          <div className="product-price">
            {product.promotion > 0 ? (
              <>
                <span className="product-price-old">${product.price.toFixed(2)}</span>
                <span className="product-price-new">${discountedPrice.toFixed(2)}</span>
              </>
            ) : (
              <span className="product-price-current">${product.price.toFixed(2)}</span>
            )}
          </div>
          <div className="product-meta">
            <span className="product-views">👁 {product.views}</span>
            <span className="product-stock">Stock: {product.stock}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

