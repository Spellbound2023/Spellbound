'use client'
import React from 'react'
import styles from '../../../styles/login.module.css'
import { useRouter } from 'next/navigation';

/* Logic for signup form */
const Form = () => {
  const { push } = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const data = { username: username, password: password};
    
    // Security headers for API request
    const response = await fetch("../api/user/register", {
      method: "post",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    // CHeck for successful HTTP status 
    if (response.status == 201) {
      alert("Registration success!");
      push("/");
    }
    
    // Check for unsuccessful HTTP status 
    if (response.status != 201) {
      alert("Registration failed");
    }
  };

  // The markup for the signup form
  return (
    <div className={styles.mainContainer}>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
            {// Username input field}
            <input id="username" type="text" name="username" placeholder='Username' required/><br/>
            {// Password input field}
            <input id="password" type="password" name="password" placeholder='Password' required/><br/>
            {// Submit button}
            <input type="submit" value="Create"/>
        </form>
    </div>
  
    
  )
}

export default Form
