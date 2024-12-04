import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div>
      <footer
        className="d-flex flex-column justify-content-center align-items-center py-3 my-4 border-top"
        style={{
          backgroundColor: '#212529', // Dark gray background
          color: '#f8f9fa', // Light text color
          borderColor: '#343a40', // Border color matching dark theme
        }}
      >
        <div className="col-md-12 d-flex justify-content-center align-items-center">
          <Link to="/" className="mb-3 me-2 mb-md-0 lh-1 text-light">
            {/* Optional: Add a logo or icon here */}
          </Link>
          <span
            style={{
              textAlign: 'center',
              margin: '0 auto',
            }}
          >
            © 2024 RAS All Rights Reserved, Krishna Kumar Rathore
          </span>
        </div>
      </footer>
    </div>
  );
}
