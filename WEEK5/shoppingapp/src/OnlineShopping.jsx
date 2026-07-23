import React, { Component } from 'react';

// Step 2 & 3: Create a class component named Cart with properties Itemname and Price.
export class Cart extends Component {
  render() {
    // In React Class Components, we consume properties (props) via this.props.
    const { Itemname, Price } = this.props;
    
    return (
      <div className="cart-card">
        <div className="cart-icon">🎁</div>
        <div className="cart-info">
          <h3 className="cart-item-name">{Itemname}</h3>
          <p className="cart-item-price">₹{Price.toLocaleString('en-IN')}</p>
        </div>
      </div>
    );
  }
}

// Step 2: Create a class component named OnlineShopping.
class OnlineShopping extends Component {
  constructor(props) {
    super(props);
    
    // Step 4: In the OnlineShopping class, create an array of Cart items and initialize it with 5 items.
    this.cartItems = [
      { Itemname: "Apple iPhone 15 Pro", Price: 134900 },
      { Itemname: "Sony WH-1000XM5 ANC Headphones", Price: 29990 },
      { Itemname: "Apple MacBook Air M3", Price: 114900 },
      { Itemname: "Keychron K2 Mechanical Keyboard", Price: 8500 },
      { Itemname: "Logitech MX Master 3S Mouse", Price: 10995 }
    ];
  }

  render() {
    return (
      <div className="shopping-dashboard">
        <h2 className="section-title">🛍️ Curated Products Catalog</h2>
        {/* Step 5: Loop through these items and render the data to the display. */}
        <div className="cart-items-grid">
          {this.cartItems.map((item, index) => (
            <Cart 
              key={index} 
              Itemname={item.Itemname} 
              Price={item.Price} 
            />
          ))}
        </div>
      </div>
    );
  }
}

export default OnlineShopping;
