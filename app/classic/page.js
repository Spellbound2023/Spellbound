import React from "react";
import GameBox from "./GameBox";
import NavBar from "../../components/NavBar";
import styles from "../../styles/classic/page.module.css";
import ScoreCount from "./scoreCount";


const Page = () => {
  return (
    <main className={styles.container}>
      <div className={styles.navContainer}>
        <NavBar />
      </div>
      <div className={styles.gameBoxContainer}>
        <GameBox />
      </div>
    </main>
  );
};

export default Page;
