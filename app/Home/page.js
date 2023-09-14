import React from 'react'
import styles from '../components/homeMenu.module.css'
import MainMenu from '../components/homeMenu.js'


import Link from 'next/link';


export default function Home() {
  return (
    <main>
      <div class={styles.Header}>
        <h1>Select a Gamemode</h1>
      </div>
        <MainMenu/>
    </main>
  );
}