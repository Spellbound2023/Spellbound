"use client";
import React from "react";
import styles from "../styles/homeMenu.module.css";
import Image from "next/image";
import Link from "next/link";

const MainMenu = () => {
  return (
    <div className={styles.MenuContainer}>
      <div className={styles.ButtonOuter}>
        <Link href="/classic">
          <div className={styles.Button}>
            <Image src="/images/Bookmark.png" width={100} height={100} />
            <br />
            Classic
          </div>
        </Link>
      </div>

      <div className={styles.ButtonOuter}>
        <Link href="/">
          <div className={styles.Button}>
            <Image src="/images/Lightning Bolt.png" width={100} height={100} />
            <br />
            Versus
          </div>
        </Link>
      </div>

      <div className={styles.ButtonOuter}>
        <Link href="/">
          <div className={styles.Button}>
            <Image
              src="/images/Tightrope Walking.png"
              width={100}
              height={100}
            />
            <br />
            Challenges
          </div>
        </Link>
      </div>


      <div className={styles.ButtonOuter}>
        <Link href="/">
          <div className={styles.Button}>
            <Image src="/images/Combo Chart.png" width={100} height={100} />
            <br />
            Statistics
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MainMenu;
