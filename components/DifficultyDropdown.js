import React from 'react';

/* Style settings for difficulty selection dropdown menu */
const DifficultyDropdown = ({ isDropdownOpen, onSelectDifficulty }) => {
  const DropdownMenuStyle = {
    display: isDropdownOpen ? 'block' : 'none',
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: '#5D2689', // Background color
    border: '1px solid #000', // Border
    borderRadius: '4px', // Border radius
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    zIndex: 2,
  };

  const menuItemStyle = {
    padding: '8px 16px',
    cursor: 'pointer',
    color: '#000',
  };


  return (
    <div>
      <div style={DropdownMenuStyle}>
        <div
          style={menuItemStyle}
          onClick={() => onSelectDifficulty('Easy')}
        >
          Easy
        </div>
        <div
          style={menuItemStyle}
          onClick={() => onSelectDifficulty('Normal')}
        >
          Normal
        </div>
        <div
          style={menuItemStyle}
          onClick={() => onSelectDifficulty('Hard')}
        >
          Hard
        </div>
      </div>
    </div>
  );
};

export default DifficultyDropdown;
