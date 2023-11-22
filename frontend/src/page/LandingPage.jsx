import React from 'react';
import backgroundImage from '../assets/bgimg1.jpg';
import './LandingPage.css'; // Create this CSS file to add custom styling
import home_img from '../assets/home_img.png'

export const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="bg-cover bg-center min-h-screen d-flex justify-content-center align-items-center">
        <div className="text-center">
          {/* <h1 className="display-4">Welcome to Alverno</h1> */}
          {/* <p className="lead"></p> */}
          <img src={home_img} alt="" />
          {/* Content below the header */}
        </div>
      </div>
      {/* Footer */}
    </div>
  );
};
