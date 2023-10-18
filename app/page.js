"use client";

import React from "react";
import styles from "../styles/page.module.css";
import LinkButton from "./LinkButton";
import { useSession } from "next-auth/react";
import HomePageNav from "../components/HomepageNav";


const page = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  if (status === "authenticated") {
    return (
      <div className={styles.flexContainer}>
        <div className={styles.contentContainer}>
          <h1 className={styles.nameHeading}>
            Spell<span>Bound</span>
          </h1>
          <div className={styles.linkButtonContainer}>
            <LinkButton path="/home" text="Start Game" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.flexContainer}>
      <div className={styles.navContainer}>
        <HomePageNav />
      </div>
      <div className={styles.contentContainer}>
        <h1 className={styles.nameHeading}>
          Spell<span>Bound</span>
        </h1>
        <div className={styles.linkButtonContainer}>
          <LinkButton path="/home" text="Start Game" style={styles.enhancedStartGameButton} />
        </div>
      </div>
    </div>
  );
};

export default page;
