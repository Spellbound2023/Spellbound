import React from "react";
import GameBox from "./GameBox";
import NavBar from "../../components/NavBar";
import styles from "../../styles/classic/page.module.css";


const Page = () => {
  return (
    //calls the gamebox and navigation bar components onto the classic page
    <main className={styles.container}>
      <div className={styles.navContainer}>
        <NavBar showDifficultyText={false} TitleText={"Classic"}/>
      </div>
        <GameBox />

    </main>
  );
};

export default Page;
