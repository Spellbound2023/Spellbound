import React from 'react'
import styles from '../../styles/login.module.css'
import Link from 'next/link'

const Close = () => {
  return (
    <div className={styles.backButton}>
        <Link href="/">X</Link>
    </div>
  )
}

export default Close