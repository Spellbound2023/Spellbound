'use client';
import React from 'react'
import styles from './homeMenu.module.css'
import Image from 'next/image'
import Link from 'next/link'


const MainMenu = () => {
  return (
    <div class={styles.MenuContainer}>
          <div class={styles.ButtonOuter}>
            <Link href="/classic">
              <div class={styles.Button}>
                <Image src='/Bookmark.png'
                width={100}
                height={100}/>
                <br/>
                Classic
              </div>
            </Link>
          </div>
        
          <div class={styles.ButtonOuter}>
            <Link href="/">
              <div class={styles.Button}>
                <Image src='/Lightning Bolt.png'
                width={100}
                height={100}/>
                <br/>
                Versus
              </div>
            </Link>
          </div>

          <div class={styles.ButtonOuter}>
            <Link href="/">
              <div class={styles.Button}>  
                <Image src='/Tightrope Walking.png'
                width={100}
                height={100}/>
                <br/>
                Challenges
              </div>
            </Link>
          </div>

          <div class={styles.ButtonOuter}>
            <Link href="/">
              <div class={styles.Button}>
                <Image src='/Combo Chart.png'
                width={100}
                height={100}/>
                <br/>
                Statistics
              </div>
            </Link>
          </div>
      </div>
  )
}

export default MainMenu