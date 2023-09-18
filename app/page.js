import React from "react";
import styles from "../styles/page.module.css";
import LinkButton from "./LinkButton";

const page = () => {
  return (
    <div className={styles.flexContainer}>
      <div className={styles.contentContainer}>
        <h1 className={styles.nameHeading}>
          Spell<span>Bound</span>
        </h1>
        <div className={styles.linkButtonContainer}>
          <LinkButton path="/home" text="Start Game" />
        </div>
        <div className={styles.loginSignupContainer}>
          <div className={styles.linkButtonContainer}>
            <LinkButton path="/" text="Log In" />
          </div>
          <div className={styles.linkButtonContainer}>
            <LinkButton path="/" text="Sign Up" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
