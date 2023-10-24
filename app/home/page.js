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
    <main>
      <div className={styles.HeaderFullScreen}>
        <NavBar  TitleText={<SpellBoundTitle/>} showDifficultyText={false}/>
      </div>
      <div className={styles.HeaderMobile}>
        <NavBar TitleText={"SpellBound"} showDifficultyText={false}/>
      </div>
      <MainMenu/>
    </main>
  );
}
