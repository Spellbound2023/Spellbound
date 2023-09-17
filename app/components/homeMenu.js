'use client';
import React from 'react'
import styles from './homeMenu.module.css'
import Image from 'next/image'


const MainMenu = () => {
  return (
    <div class={styles.MenuContainer}>
          <div class={styles.ButtonOuter}>
            <a href="/classic">
              <div class={styles.Button}>
                <Image src='/Bookmark.png'
                width={100}
                height={100}/>
                <br/>
                <b>Classic</b>
              </div>
            </a>
          </div>
        
          <div class={styles.ButtonOuter}>
            <a href="/classic">
              <div class={styles.Button}>
                <Image src='/Lightning Bolt.png'
                width={100}
                height={100}/>
                <br/>
                <b>Versus</b>
              </div>
            </a>
          </div>

          <div class={styles.ButtonOuter}>
            <a href="/classic">
              <div class={styles.Button}>  
                <Image src='/Tightrope Walking.png'
                width={100}
                height={100}/>
                <br/>
                <b>Challenges</b>
              </div>
            </a>
          </div>

          <div class={styles.ButtonOuter}>
            <a href="/classic">
              <div class={styles.Button}>
                <Image src='/Combo Chart.png'
                width={100}
                height={100}/>
                <br/>
                <b>Statistics</b>
              </div>
            </a>
          </div>
      </div>
  )
}

export default MainMenu