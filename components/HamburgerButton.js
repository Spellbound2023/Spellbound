import React, { useState } from 'react';
import DropdownMenu from './DropdownMenu';

const HamburgerButton = ({ items }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const buttonStyle = {
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
    padding: 0,
  };

  const imgStyle = {
    width: '4rem',
    height: '4rem',
  };

  return (
    <div>
      <button onClick={toggleMenu} style={buttonStyle}>
        <img
          src="/Menu.png"
          alt="Menu"
          style={imgStyle}
        />
      </button>
      <DropdownMenu isMenuOpen={isMenuOpen} items={items} />
    </div>
  );
};

export default HamburgerButton;
