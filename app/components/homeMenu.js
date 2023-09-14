'use client';
import React from 'react'
import styles from './homeMenu.module.css'


const MainMenu = () => {
  return (
    <div class={styles.MenuContainer}>
          <a href="/classic">
            <div class={styles.Button}>
              <b>Classic</b>
            </div>
          </a>
        
          <a href="/classic">
            <div class={styles.Button}>
              <b>Versus</b>
            </div>
          </a>
        
          <a href="/classic">
            <div class={styles.Button}>
              <b>Challenges</b>
            </div>
          </a>

          <a href="/classic">
            <div class={styles.Button}>
              <b>Statistics</b>
            </div>
          </a>
      </div>
  )
}

export default MainMenu