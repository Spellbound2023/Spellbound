// components/SpellBoundTitle.js
import React from 'react';

const SpellBoundTitle = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', 

  };
  const titleStyle = {
    color: 'rgba(255, 232, 99)',
    fontSize: '4rem',
    fontWeight: 400,
    marginBottom: '1.3rem',
    
  };

  const boundStyle = {
    color: '#F5BD1F', // Different color for "Bound"
    fontSize: '4.5rem',
    fontWeight: 500, // Different fontWeight for "Bound"
  };

  return (
    <div style={containerStyle}>
      <div style={titleStyle}>
        <span>Spell</span>
        <span style={boundStyle}>Bound</span> {/* Apply different styles to "Bound" */}
      </div>
    </div>
   
  );
}

export default SpellBoundTitle;
