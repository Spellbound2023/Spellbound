'use client'
import React from 'react'
import styles from '../../../styles/login.module.css'
import { signIn } from "next-auth/react";

const handleSubmit = async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  signIn("credentials", { username, password })
};

const Form = () => {
  return (
    <div className={styles.mainContainer}>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
            <input id="username" type="text" name="username" placeholder='Username' required/><br/>
            <input id = "password" type="password" name="password" placeholder='Password' required/><br/>
            <input type="submit" value="Login"/>
        </form>
    </div>   
  )
}

export default Form