import React from "react";
import styles from "../../styles/home/page.module.css";
import MainMenu from "../../components/homeMenu.js";
import Link from "next/link";

/* Homepage. */
export default function Home() {
  return (
    <main>
      <div class={styles.Header}>
        <h1>Select a Gamemode</h1>
      </div>
      <MainMenu />
    </main>
  );
}
