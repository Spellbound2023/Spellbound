import React from "react";
import GameBox from "./GameBox";
import NavBar from "../../components/NavBar";
import styles from "../../styles/classic/page.module.css";

/* Page. Contains NavBar and GameBox. */
const page = () => {
  return (
    <main>
      <div className={styles.main}>
        <NavBar />
        <GameBox />
      </div>
    </main>
  );
};

export default page;
