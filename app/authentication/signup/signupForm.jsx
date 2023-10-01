'use client'
import React from 'react'
import styles from '../../../styles/login.module.css'

const Form = () => {
  return (
    <div className={styles.mainContainer}>
        <form action="#" className={styles.loginForm}>
            <input type="text" name="username" placeholder='Username' required/><br/>
            <input type="password" name="password" placeholder='Password' required/><br/>
            <input type="email" name="email" placeholder='Email' required/><br/>
            <input type="submit" value="Create"/>
        </form>
    </div>
  
    
  )
}

export default Form