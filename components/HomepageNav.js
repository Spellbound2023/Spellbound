"use client";
import React, { useState } from "react";
import DropdownMenu from "./DropdownMenu";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const HomePageNav = () => {
  const { data: session } = useSession();
  const loggedOutMenuItems = [
    { href: "#", label: "Sign in" },
  ];

  const loggedInMenuItems = [
    { href: "#", label: "Sign out", onClick: signOut },
  ];

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    right: "0",
    top: "50%",
    transform: "translateY(-50%)",
    flexDirection: "column",
  };

  const noAccountStyle = {
    borderRadius: "35px",
    width: "50px",
    height: "50px",
    marginLeft: "10px",
  };

  const chevronDownStyle = {
    width: "20px",
    height: "20px",
    marginLeft: "10px",
    marginBottom: "10px",
  };

  const signUpButtonStyle = {
    background: "linear-gradient(180deg, #5D2689 0%, #47297B 100%)",
    color: "#F5BD1F",
    borderRadius: "35px",
    border: "none",
    padding: "15px 30px",
    cursor: "pointer",
    fontSize: "large",
    marginRight: "10px",
  };

  const signInButtonStyle = {
    background: "#5D2689",
    color: "#F5BD1F",
    borderRadius: "35px",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "medium",
  };

  return (
    <>
      <div style={containerStyle}>
        {session ? (
          <div>
            <img
              src="/images/noAccount.png"
              alt="User Image"
              style={noAccountStyle}
              onClick={toggleMenu}
            />
            <img
              src="/images/chevronDown.png"
              alt="chevronDown"
              style={chevronDownStyle}
              onClick={toggleMenu}
            />
          </div>
        ) : (
          <div>
            {/* Redirect to signup and login pages */}
            <Link href="/authentication/signup">
              <button style={signUpButtonStyle}>Sign up</button>
            </Link>
            <Link href="/authentication/login">
              <button style={signInButtonStyle}>Log in</button>
            </Link>
          </div>
        )}
        {showMenu && (
          <DropdownMenu
            isMenuOpen={showMenu}
            items={session ? loggedInMenuItems : loggedOutMenuItems}
          />
        )}
      </div>
    </>
  );
};

export default HomePageNav;
