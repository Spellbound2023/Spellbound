import React from "react";
import styles from "../../styles/home/page.module.css";
import MainMenu from "../../components/homeMenu.js";
import HomepageNav from "../../components/HomepageNav";
import OpponentGamebox from "../../components/OpponentGamebox";
import NavBar from "@/components/NavBar";
import SpellBoundTitle from "@/components/SpellBoundTitle 2";

/* Homepage. */
export default function Home() {
  return (
    <main style={{ height: "100vh" }}>
      <div className={styles.Header}>
        <NavBar  TitleText={<SpellBoundTitle/>} showDifficultyText={false}/>
      </div>
      <MainMenu/>
    </main>
  );
}
