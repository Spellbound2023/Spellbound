// components/CornyTagline.js
import React from 'react';

const Tagline = () => {
  const taglineStyle = {
    color: 'rgba(255, 232, 99, 0.75)',
    fontSize: '3rem',
    fontStyle: 'normal',
    lineHeight: 'normal',
    marginBottom: '1.3rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', 
  };

  return (
    <div style={taglineStyle}>
      some corny tagline
    </div>
  );
}

export default Tagline;
