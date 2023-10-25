import Link from "next/link";
import React from "react";
import styles from "../styles/LinkButton.module.css";

const LinkButton = ({ path, text }) => {
  //defnes a component used in root page taking its 
  //href path and its text as a prop and displaying
  return (
    <div className={styles.linkContainer}>
      <Link className={styles.link} href={path}>
        <div>
          <p className={styles.linkText}>{text}</p>
        </div>
      </Link>
    </div>
  );
};

export default LinkButton;
