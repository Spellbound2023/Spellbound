'use client'
import React from 'react'
import styles from '../../../styles/login.module.css'
import Link from 'next/link'

const Form = () => {
  return (
    <div className={styles.mainContainer}>
        <form action="#" className={styles.loginForm}>
            <input type="text" name="username" placeholder='Username' required/><br/>
            <input type="password" name="password" placeholder='Password' required/><br/>
            <input type="submit" value="Login"/>
        </form>
    </div>   
  )
}

export default Form