import React from "react";
import styles from "../../styles/home/page.module.css";
import MainMenu from "../../components/homeMenu.js";

/* Homepage. */
export default function Home() {
  return (
    <main>
      <div className={styles.Header}>
        <h1>Select a Gamemode</h1>
      </div>
      <MainMenu />
    </main>
  );
}
