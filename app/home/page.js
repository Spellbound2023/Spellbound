import React from "react";
import styles from "../../styles/home/page.module.css";
import MainMenu from "../../components/homeMenu.js";
import HomepageNav from "../../components/HomepageNav";
import OpponentGamebox from "../../components/OpponentGamebox";

/* Homepage. */
export default function Home() {
  return (
    <main style={{ height: "100vh" }}>
      <div className={styles.Header}>
        <h1>Select a gamemode</h1>
        <HomepageNav />
      </div>
      <MainMenu />
    </main>
  );
}
