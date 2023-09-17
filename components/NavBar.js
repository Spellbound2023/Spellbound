"use client";
import React from 'react';
import SpellBoundTitle from '../components/SpellBoundTitle';
import DifficultyText from '../components/DifficultyText'; // Import the RightComponent
import HamburgerMenu from '../components/HamburgerMenu';

const NavBar = () => {
  return (
    <nav
      style={{
        position: "relative",
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '95%',
        backgroundColor: 'transparent',
        color: '#333',
        fontFamily: 'Iowan Old Style, serif',
      }}
    >
      <div style={{ flex: 1, textAlign: 'left' }}><HamburgerMenu/></div>
      <div style={{ flex: 2, textAlign: 'center' }}><SpellBoundTitle /></div>
      <div style={{ flex: 1, textAlign: 'right' }}><DifficultyText /></div>
    </nav>
  );
};

export default NavBar;
