import React from 'react'
import styles from '../../styles/versus.module.css'
import HamburgerMenu from '@/components/HamburgerMenu'

const TopBar = () => {
  return (
    <div className={styles.Top}>
        <HamburgerMenu/>
        
        <div className={styles.Timer}>
            TIMER
        </div>


    </div>
  )
}

export default TopBar