import React from 'react'
import styles from '../../styles/login.module.css'
import Link from 'next/link'

const Close = ({ path }) => {
  return (
    <div className={styles.backButton}>
        <Link href={path}>X</Link>
    </div>
  )
}

export default Close