import React from 'react';
import officeImg from './assets/office_space_1.png';
import './App.css';

function App() {
  // Step 4: Create an office object containing details like Name, Rent, and Address.
  const featuredOffice = {
    name: "LuxSpace Executive Penthouse",
    rent: 85000,
    address: "Suite 500, Financial District, Mumbai",
    image: officeImg
  };

  // Step 5: Create a list of objects and loop through the office space items to display the data.
  const officeList = [
    {
      id: 1,
      name: "Silicon Valley Startup Hub",
      rent: 120000,
      address: "Building B, Tech Park Phase 2, Pune",
      image: officeImg
    },
    {
      id: 2,
      name: "Glasshouse Creative Loft",
      rent: 55000,
      address: "12 Studio Rd, Arts District, Bangalore",
      image: officeImg
    },
    {
      id: 3,
      name: "Greenfield Co-working Space",
      rent: 42000,
      address: "202 Co-work Blvd, Sector 5, Hyderabad",
      image: officeImg
    },
    {
      id: 4,
      name: "Metro Boardroom Suite",
      rent: 75000,
      address: "4th Floor, Metro Plaza, Delhi NCR",
      image: officeImg
    },
    {
      id: 5,
      name: "Compact Developer Studio",
      rent: 35000,
      address: "88 Startup Alley, Chennai",
      image: officeImg
    },
    {
      id: 6,
      name: "Premium Corporate HQ",
      rent: 250000,
      address: "Block 10, Prestige Business Bay, Kolkata",
      image: officeImg
    }
  ];

  return (
    <div className="app-container">
      <header className="app-header">
        {/* Step 2: Create an element to display the page heading. */}
        <h1 className="main-title">LuxSpace Premium Office Rentals</h1>
        <p className="subtitle">Find your next high-performance workspace</p>
      </header>

      <main className="app-main">
        {/* Step 4 Display: Single Featured Office Space */}
        <section className="featured-section">
          <h2 className="section-title">⭐ Featured Office Space</h2>
          <div className="featured-card">
            <div className="featured-image-container">
              {/* Step 3: Add an attribute to display an image of the office space. */}
              <img 
                src={featuredOffice.image} 
                alt={featuredOffice.name} 
                className="featured-image" 
              />
            </div>
            <div className="featured-details">
              <h3 className="office-name">{featuredOffice.name}</h3>
              <p className="office-address">📍 {featuredOffice.address}</p>
              <div className="rent-box">
                Monthly Rent:{" "}
                {/* Step 6: Apply inline CSS to display the Rent color in Red if it is below 60,000, and Green if it is above 60,000. */}
                <span 
                  className="rent-value"
                  style={{ color: featuredOffice.rent < 60000 ? 'red' : 'green' }}
                >
                  ₹{featuredOffice.rent.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Step 5 Display: Loop/map through the list of office space items */}
        <section className="catalog-section">
          <h2 className="section-title">🏢 Browse All Office Spaces</h2>
          <div className="office-grid">
            {officeList.map((office) => (
              <div key={office.id} className="office-card">
                <div className="card-image-container">
                  {/* Step 3: Add an attribute to display an image of the office space. */}
                  <img 
                    src={office.image} 
                    alt={office.name} 
                    className="card-image" 
                  />
                </div>
                <div className="card-details">
                  <h3 className="office-name">{office.name}</h3>
                  <p className="office-address">📍 {office.address}</p>
                  <div className="rent-box">
                    Monthly Rent:{" "}
                    {/* Step 6: Apply inline CSS to display the Rent color in Red if it is below 60,000, and Green if it is above 60,000. */}
                    <span 
                      className="rent-value"
                      style={{ color: office.rent < 60000 ? 'red' : 'green' }}
                    >
                      ₹{office.rent.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>© 2026 LuxSpace Rental Corp. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
