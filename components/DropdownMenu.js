"use client"
import React from 'react';
import Link from 'next/link';

const DropdownMenu = ({ isMenuOpen, items }) => {
  const dropdownStyle = {
    opacity: isMenuOpen ? 1 : 0,
    clipPath: isMenuOpen ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' : 'polygon(0 0, 100% 0, 100% 0%, 0 0%)',
    transition: 'opacity 0.3s ease-in-out, clip-path 0.3s ease-in-out',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.625rem',
    position: 'absolute',
    top: '100%',
    zIndex: 1,
    width: '10vw'
  };

  const listStyle = {
    listStyleType: 'none',
  };

  const elementStyle = {
    margin: "15px 0"
  };

  const listItemStyle = {
    color: '#F5BD1F', 
    textDecoration: 'none',
    fontSize: '1.5rem',
    lineHeight: 'normal',
  };

  const rectangleStyle = {
    borderRadius: '10px',
    background: 'linear-gradient(180deg, #5D2689 0%, #47297B 100%)',
    padding: '10px'
  };

  return (
    <div style={dropdownStyle} className="dropdown-menu">
      <div style={rectangleStyle}>
        <ul style={listStyle}>
          {items.map(item => (
            <li key={item.label} style={elementStyle}>
              <Link href={item.href} style={listItemStyle}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;
