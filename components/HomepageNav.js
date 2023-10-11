"use client";
import React, { useState } from "react";
import DropdownMenu from "./DropdownMenu";
import Link from "next/link";

const HomePageNav = () => {
    const isLoggedIn = true; // placeholder for actually fetching this from authentication state

    const loggedOutMenuItems = [
        { href: "#", label: "Help" },
        { href: "#", label: "Sign in" },
    ];

    const loggedInMenuItems = [
        { href: "#", label: "Profile" },
        { href: "#", label: "Help" },
        { href: "#", label: "Logout" },
    ];

    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(prevState => !prevState);
    };

    const containerStyle = {
        display: "flex",
        alignItems: "center",
        position: "absolute",
        right: "0",
        top: "50%",
        transform: "translateY(-50%)",
        flexDirection: "column"
    };

    const noAccountStyle = {
        borderRadius: "35px",
        width: "50px",
        height: "50px",
        marginLeft: "10px" 
    };

    const chevronDownStyle = {
        width: "20px",
        height: "20px",
        marginLeft: "10px",
        marginBottom: "10px"
    };

    const signInButtonStyle = {
        background: "linear-gradient(180deg, #5D2689 0%, #47297B 100%)",
        color: "#F5BD1F",
        borderRadius: "35px",
        border: "none",
        padding: "10px 20px",
        cursor: "pointer",
        fontSize: "large"
    };

    return (
        <>
            <h1>Select a gamemode</h1>
            <div style={containerStyle}>
                {isLoggedIn ? (
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
                    <Link href="#">
                        <button style={signInButtonStyle}>
                            Sign in
                        </button>
                    </Link>
                )}
                {showMenu && <DropdownMenu isMenuOpen={showMenu} items={isLoggedIn ? loggedInMenuItems : loggedOutMenuItems} />}
            </div>
        </>
    );
}

export default HomePageNav;
