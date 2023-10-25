import React, { useState, useEffect } from 'react';
import DifficultyDropdown from './DifficultyDropdown'; // Import the new component

const DifficultyText = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  useEffect(() => {
    setSelectedDifficulty(difficultyOptions[0]);
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const onSelectDifficulty = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setDropdownOpen(false);
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end', // Align items to the right
    position: 'relative', // Use relative positioning
  };

  const DifficultyTextStyle = {
    color: '#FFE150',
    fontSize: '2rem',
    fontStyle: 'normal',
    lineHeight: 'normal',
    cursor: 'pointer',
    
  };

  const selectedDifficultyStyle = {
    width: '100px',
    height: '40px',
    flexShrink: 0,
    borderRadius: '4px',
    border: '1px solid #000',
    backgroundColor: '#5D2689',
    color: '#FFE150',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  

  const difficultyOptions = ['Easy', 'Normal', 'Hard'];

  return (
    <div style={containerStyle}>
      <div style={DifficultyTextStyle}>
        Classic Mode
      </div>
      <div
        style={selectedDifficultyStyle}
        onClick={toggleDropdown}
      >
        {selectedDifficulty}
      </div>
      {/* Toggle difficulty dropdown under */}
      <DifficultyDropdown
        isDropdownOpen={isDropdownOpen}
        selectedDifficulty={selectedDifficulty}
        onSelectDifficulty={onSelectDifficulty}
        difficultyOptions={difficultyOptions}
      />
    </div>
  );
};

export default DifficultyText;
