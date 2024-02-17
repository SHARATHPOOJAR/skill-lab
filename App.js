// App.js

import React, { useState } from 'react';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [products] = useState([
    { id: 1, name: 'Product 1', price: 10, image: 'product1.jpg' },
    { id: 2, name: 'Product 2', price: 20, image: 'product2.jpg' },
    { id: 3, name: 'Product 3', price: 30, image: 'product3.jpg' }
  ]);

  const addToCart = (product) => {
    setCart([...cart, { ...product, quantity: 1 }]);
  };

  const removeFromCart = (productToRemove) => {
    setCart(cart.filter(product => product !== productToRemove));
  };

  const incrementQuantity = (product) => {
    setCart(cart.map(item => (item === product ? { ...item, quantity: item.quantity + 1 } : item)));
  };

  const decrementQuantity = (product) => {
    setCart(cart.map(item => (item === product ? { ...item, quantity: item.quantity - 1 } : item)).filter(item => item.quantity > 0));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <div className="search-bar">
            <input type="text" placeholder="Search products..." />
          </div>
          <div className="categories">
            <select>
              <option value="">All Categories</option>
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
              <option value="category3">Category 3</option>
            </select>
          </div>
        </nav>
      </header>
      <div className="product-list">
        {products.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <div className="quantity-controls">
              <button onClick={() => decrementQuantity(product)}>-</button>
              <span>{(cart.find(item => item.id === product.id) || { quantity: 0 }).quantity}</span>
              <button onClick={() => incrementQuantity(product)}>+</button>
            </div>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <div className="cart">
        <h2>Shopping Cart</h2>
        {cart.map(item => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.name} />
            <div>
              <h3>{item.name}</h3>
              <p>${item.price} x {item.quantity}</p>
              <button onClick={() => removeFromCart(item)}>Remove</button>
            </div>
          </div>
        ))}
        <div className="total">
          <h3>Total: ${getTotalPrice()}</h3>
        </div>
      </div>
    </div>
  );
}

export default App;