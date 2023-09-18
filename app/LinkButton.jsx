import Link from "next/link";
import React from "react";
import styles from "../styles/LinkButton.module.css";

const LinkButton = ({ path, text }) => {
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
