import React, { useState } from 'react';
import './PropSelection.css'; // Make sure to include your actual CSS file name

const PropSelection = () => {
  const [selectedProps, setSelectedProps] = useState([]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setSelectedProps(prev => 
      checked ? [...prev, value] : prev.filter(prop => prop !== value)
    );
  };

  const propOptions = [
    'player_points', 'player_rebounds', 'player_assists', 
    'player_threes', 'player_blocks', 'player_steals', 
    'player_blocks_steals', 'player_turnovers', 
    'player_points_rebounds_assists', 'player_points_rebounds', 
    'player_points_assists', 'player_rebounds_assists'
  ];

  return (
    <div className="prop-selection-container">
      <main className="main-content">
        <h2 className="select-prop-title">Select a prop</h2>
        <form className="checkbox-container">
          {propOptions.map((prop, index) => (
            <label key={index} className="checkbox-label">
              <input 
                type="checkbox" 
                value={prop} 
                onChange={handleCheckboxChange} 
                checked={selectedProps.includes(prop)}
              />
              {prop.replace('player_', '').replace(/_/g, ' ')}
            </label>
          ))}
        </form>
      </main>
    </div>
  );
};

export default PropSelection;
