"use client";
import React from "react";
import SpellBoundTitle from "./SpellBoundTitle";
import DifficultyText from "./DifficultyText";
import HamburgerButton from "./HamburgerButton";
import { signOut, useSession } from "next-auth/react";
import HomePageNav from "./HomepageNav";

const NavBar = ({ showDifficultyText = true, TitleText}) => {
  const { data: session } = useSession();
  const menuItems = [
    { href: "/", label: "Main" },
    { href: "/home", label: "Home" },
    { href: "/versus", label: "Versus" },
  ];

  return (
    <nav
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: "1rem",
        backgroundColor: "transparent",
        color: "#333",
        width: "100%", 
      }}
    >
      <div style={{ flex: 1, textAlign: "left" }}>
        <HamburgerButton items={menuItems} />
      </div>
      <div style={{ flex: 2, textAlign: "center" }}>
        <SpellBoundTitle text={TitleText}/>
      </div>
      {showDifficultyText ? (
        <div style={{ flex: 1, textAlign: "right" }}>
          <DifficultyText />
        </div>
      ) : (
        <div style={{ flex: 1 }}></div> // Empty placeholder div
      )}
      {session && (
        <HomePageNav/>
      )}
    </nav>
  );
};

export default NavBar;
