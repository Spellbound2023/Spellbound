import React from "react";
import styles from "../../styles/home/page.module.css";
import MainMenu from "../../components/homeMenu.js";
import HomepageNav from "../../components/HomepageNav";
import OpponentGamebox from "../../components/OpponentGamebox";

/* Homepage. */
export default function Home() {
  return (
    <main>
      <div className={styles.Header}>
        <HomepageNav/>
      </div>
      <MainMenu />
    </main>
  );
}
