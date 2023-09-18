
import React from 'react';

function HomeScreenButton() {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', 
  };

  const buttonStyle = {
    width: '150px',
    height: '39px',
    flexShrink: 0,
    borderRadius: '20px',
    background: 'linear-gradient(180deg, #47297B 0%, #5D2689 100%)',
    color: '#FFE863',
    border: 'none',
    cursor: 'pointer',
    marginBottom: '20px',
    fontFamily: "'Montserrat', sans-serif", 

  };
  
  const buttonRowStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '10px',
    flexShrink: 0,
  };

  return (
    <div style={containerStyle}>
      <button style={buttonStyle}>
        Original Button
      </button>
      <div style={buttonRowStyle}>
        <button style={buttonStyle}>
          Button 1
        </button>
        <button style={buttonStyle}>
          Button 2
        </button>
      </div>
    </div>
  );
}

export default HomeScreenButton;
