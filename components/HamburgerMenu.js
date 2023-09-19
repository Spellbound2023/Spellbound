"use client";
import React, { useState } from 'react';
import Link from 'next/link';


const HamburgerMenu = () => {
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

  const dropdownStyle = {
    opacity: isMenuOpen ? 1 : 0, // Initial opacity
    transition: 'opacity 0.1s ease-in', // CSS transition for opacity
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.625rem',
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: 'transparent',
    zIndex: 1,
    width: '10vw'
    
  };

  const listStyle = {
    listStyleType: 'none', // Remove list item bullets
    padding: '12px', // Add padding to list items
  };
  const listItemStyle = {
    color: '#F5BD1F', 
    textDecoration: 'none',
    fontSize: '1.5rem',
    lineHeight: 'normal',
  };

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={toggleMenu} style={buttonStyle}>
        <img
          src="/Menu.png"
          alt="Menu"
          style={imgStyle} // Apply the styles here
        />
      </button>
      <div style={dropdownStyle} className="dropdown-menu">
        <ul style={listStyle}>
          <li>
            <Link href="/home" style={listItemStyle}>Home</Link>
          </li>
          <li >
            <Link href="#" style={listItemStyle}>Stats</Link>
          </li>
          <li>
            <Link href="#" style={listItemStyle}>Challenges</Link>
          </li>
          <li>
            <Link href="#" style={listItemStyle}>1v1 Mode</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HamburgerMenu;
