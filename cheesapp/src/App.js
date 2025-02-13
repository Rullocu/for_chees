import React, { useEffect, useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { sectionConfig } from './config';
import './App.css';

const AudioContext = createContext();

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

const Section = ({ config, showAudio = true }) => {
  const navigate = useNavigate();
  const { setIsPlaying } = useContext(AudioContext);
  const currentIndex = sectionConfig.findIndex(section => section.path === config.path);
  const nextSection = sectionConfig[currentIndex + 1];
  const prevSection = sectionConfig[currentIndex - 1];

  const handleNext = () => {
    if (config.path === "/") {
      setIsPlaying(true);
    }
    navigate(nextSection.path);
  };

  return (
    <div 
      className="page" 
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/${config.background})` }}
    >
      {showAudio && <AudioControls />}
      
      {prevSection && (
        <button 
          onClick={() => navigate(prevSection.path)} 
          className="back-button"
        >
          Back
        </button>
      )}
      
      {config.content && (
        <div className="content" style={config.content.style}>
          {config.content.title && (
            <h2 style={config.content.titleStyle}>{config.content.title}</h2>
          )}
          {config.content.text && (
            <p style={config.content.textStyle}>{config.content.text}</p>
          )}
        </div>
      )}

      {nextSection && (
        <button 
          onClick={handleNext} 
          className="next-button"
          style={config.content?.buttonStyle}
        >
          {config.content?.buttonText || "Next"}
        </button>
      )}
    </div>
  );
};

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio(`${process.env.PUBLIC_URL}/bgm.mp3`));

  useEffect(() => {
    audio.loop = true;
    if (isPlaying) {
      audio.play().catch(error => console.log("Audio play failed:", error));
    } else {
      audio.pause();
    }
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isPlaying, audio]);

  return (
    <AudioContext.Provider value={{ isPlaying, setIsPlaying }}>
      <Router>
        <Routes>
          {sectionConfig.map((section, index) => (
            <Route
              key={section.path}
              path={section.path}
              element={
                <Section 
                  config={section}
                  showAudio={index !== 0}
                />
              }
            />
          ))}
        </Routes>
      </Router>
    </AudioContext.Provider>
  );
}

export default App;