import React from 'react';

// Step 2 & 3: Create Book Details component and utilize map() to iterate over books array with key prop.
function BookDetails() {
  const books = [
    { id: 101, bname: 'Mastering React 19', price: 650 },
    { id: 102, bname: 'Design Patterns in JavaScript', price: 540 },
    { id: 103, bname: 'Spring Boot 3 & Microservices', price: 780 },
    { id: 104, bname: 'Clean Code & Refactoring', price: 490 }
  ];

  return (
    <div className="section-card">
      <h2 className="section-title">📚 Book Details</h2>
      <p className="section-subtitle">Iterating books array using <code>map()</code> and assigning <code>key=&#123;book.id&#125;</code></p>
      
      <div className="cards-grid">
        {/* Utilize map() function to iterate over books array and assign book.id as unique key */}
        {books.map((book) => (
          <div key={book.id} className="item-card book-item">
            <div className="card-badge">ID: {book.id}</div>
            <h3 className="item-name">{book.bname}</h3>
            <p className="item-price">Price: <span>₹{book.price}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookDetails;
