import React, { useEffect, useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';

// Create context for audio state
const AudioContext = createContext();

// Audio controls component that uses shared context
const AudioControls = () => {
  const { isPlaying, setIsPlaying } = useContext(AudioContext);
  
  return (
    <button 
      onClick={() => setIsPlaying(!isPlaying)} 
      className="music-button"
    >
      {isPlaying ? "🔇 Mute" : "🔊 Play Music"}
    </button>
  );
};

// Landing Page
const LandingPage = () => {
  const navigate = useNavigate();
  const { setIsPlaying } = useContext(AudioContext);
  
  const handleStart = () => {
    setIsPlaying(true);
    navigate('/home');
  };
  
  return (
    <div 
      className="page" 
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/start.jpg)` }}
    >
      <div className="content">
        <h1>Are You Ready to Start the Journey?</h1>
      </div>
      <button 
        onClick={handleStart} 
        className="next-button"
      >
        Start Journey
      </button>
    </div>
  );
};

// Home page
const Home = () => {
  const navigate = useNavigate();
  
  return (
    <div 
      className="page" 
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/background.jpg)` }}
    >
      <AudioControls />
      <div className="content">
        <h1>Welcome to Our Journey</h1>
        <p>Let's explore together, click next to begin.</p>
      </div>
      <button 
        onClick={() => navigate('/section1')} 
        className="next-button"
      >
        Next
      </button>
    </div>
  );
};

// Section component
const Section = ({ backgroundImage, title, text, nextPath, prevPath }) => {
  const navigate = useNavigate();
  
  return (
    <div className="page" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/${backgroundImage})` }}>
      <AudioControls />
      <button 
        onClick={() => navigate(prevPath)} 
        className="back-button"
      >
        Back
      </button>
      
      <div className="content">
        <h2>{title}</h2>
        <p>{text}</p>
      </div>

      {nextPath && (
        <button 
          onClick={() => navigate(nextPath)} 
          className="next-button"
        >
          Next
        </button>
      )}
    </div>
  );
};

// Main App component with audio management
function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio(`${process.env.PUBLIC_URL}/bgm.mp3`));

  useEffect(() => {
    // Configure audio
    audio.loop = true;

    // Play/pause based on state
    if (isPlaying) {
      audio.play().catch(error => console.log("Audio play failed:", error));
    } else {
      audio.pause();
    }

    // Cleanup on component unmount
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isPlaying, audio]);

  return (
    <AudioContext.Provider value={{ isPlaying, setIsPlaying }}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route 
            path="/section1" 
            element={
              <Section 
                backgroundImage="section1.jpg"
                title="Section 1"
                text="This is the first section of our journey. Here we explore the beginning of our story."
                nextPath="/section2"
                prevPath="/home"
              />
            } 
          />
          <Route 
            path="/section2" 
            element={
              <Section 
                backgroundImage="section2.jpg"
                title="Section 2"
                text="Welcome to the middle of our journey. Here we dive deeper into our adventure."
                nextPath="/section3"
                prevPath="/section1"
              />
            } 
          />
          <Route 
            path="/section3" 
            element={
              <Section 
                backgroundImage="section3.jpg"
                title="Section 3"
                text="This is the final section of our journey. Thank you for coming along!"
                nextPath="/section4"
                prevPath="/section2"
              />
            } 
          />
          <Route 
            path="/section4" 
            element={
              <Section 
                backgroundImage="section2.jpg"
                title="Section 4"
                text="Welcome to the middle of our journey. Here we dive deeper into our adventure."
                nextPath={null}
                prevPath="/section3"
              />
            } 
          />
        </Routes>
      </Router>
    </AudioContext.Provider>
  );
}

export default App;