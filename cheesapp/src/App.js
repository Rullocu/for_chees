// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';

// Section component with back button
const Section = ({ backgroundImage, title }) => {
  const navigate = useNavigate();
  
  return (
    <div className="section" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/${backgroundImage})` }}>
      <button 
        onClick={() => navigate('/')} 
        className="back-button"
      >
        Back to Home
      </button>
      <div className="section-content">
        <h2>{title}</h2>
      </div>
    </div>
  );
};

// Home page with centered navigation buttons
const Home = () => (
  <div 
    className="home" 
    style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/background.jpg)` }}
  >
    <div className="nav-buttons">
      <Link to="/section1" className="nav-button">
        Section 1
      </Link>
      <Link to="/section2" className="nav-button">
        Section 2
      </Link>
      <Link to="/section3" className="nav-button">
        Section 3
      </Link>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/section1" 
          element={<Section backgroundImage="section1.jpg" title="Section 1" />} 
        />
        <Route 
          path="/section2" 
          element={<Section backgroundImage="section2.jpg" title="Section 2" />} 
        />
        <Route 
          path="/section3" 
          element={<Section backgroundImage="section3.jpg" title="Section 3" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;