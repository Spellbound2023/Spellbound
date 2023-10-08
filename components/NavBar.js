"use client";
import React from "react";
import SpellBoundTitle from "./SpellBoundTitle";
import DifficultyText from "./DifficultyText";
import HamburgerMenu from "./HamburgerMenu";
import { signOut, useSession } from "next-auth/react";

const NavBar = () => {
  const { data: session } = useSession();

  if (session) {
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
          <HamburgerMenu />
        </div>
        <div style={{ flex: 2, textAlign: "center" }}>
          <SpellBoundTitle />
        </div>
        <div style={{ flex: 1, textAlign: "right" }}>
          <DifficultyText />
        </div>
        <a onClick={signOut} style={{ color: "white", padding: 20 }}>
          Sign Out
        </a>
      </nav>
    );
  } else {
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
          <HamburgerMenu />
        </div>
        <div style={{ flex: 2, textAlign: "center" }}>
          <SpellBoundTitle />
        </div>
        <div style={{ flex: 1, textAlign: "right" }}>
          <DifficultyText />
        </div>
      </nav>
    );
  }
};

export default NavBar;
