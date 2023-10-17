import React from 'react'
import styles from '../../styles/versus.module.css'
import HamburgerButton from '@/components/HamburgerButton'

const TopBar = () => {

  const menuItems = [
    { href: '/home', label: 'Home' },
    { href: '#', label: 'Stats' },
    { href: '#', label: 'Challenges' },
    { href: '#', label: '1v1 Mode' },
  ];
  return (
    <div className={styles.Top}>
        <HamburgerButton items={menuItems}/>
      
        <div className={styles.Timer}>
            TIMER
        </div>


    </div>
  )
}

export default TopBar