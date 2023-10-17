"use client";
import React from "react";
import SpellBoundTitle from "./SpellBoundTitle";
import DifficultyText from "./DifficultyText";
import HamburgerButton from "./HamburgerButton";
import { signOut, useSession } from "next-auth/react";

const NavBar = ({ showDifficultyText = true }) => {
  const { data: session } = useSession();
  const menuItems = [
    { href: '/home', label: 'Home' },
    { href: '#', label: 'Stats' },
    { href: '#', label: 'Challenges' },
    { href: '#', label: '1v1 Mode' },
  ];

  return (
    <nav
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "95%",
        paddingTop: "1rem",
        backgroundColor: "transparent",
        color: "#333",
      }}
    >
      <div style={{ flex: 1, textAlign: "left" }}>
        <HamburgerButton items={menuItems} />
      </div>
      <div style={{ flex: 2, textAlign: "center" }}>
        <SpellBoundTitle />
      </div>
      {showDifficultyText ? (
        <div style={{ flex: 1, textAlign: "right" }}>
          <DifficultyText />
        </div>
      ) : (
        <div style={{ flex: 1 }}></div>  // Empty placeholder div
      )}
      {session && (
        <a onClick={signOut} style={{ color: "white", padding: 20 }}>
          Sign Out
        </a>
      )}
    </nav>
  );
};

export default NavBar;
