'use client'
import React from 'react'
import styles from '../../../styles/login.module.css'
import { redirect } from 'next/navigation';

const handleSubmit = async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const data = { username: username, password: password};

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
  
  if (response.status == 201) {
    alert("Registration success!");
    //redirect("/");
  }

  if (response.status != 201) {
    alert("Registration failed");
  }
};

const Form = () => {
  return (
    <div className={styles.mainContainer}>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
            <input id="username" type="text" name="username" placeholder='Username' required/><br/>
            <input id="password" type="password" name="password" placeholder='Password' required/><br/>
            <input type="submit" value="Create"/>
        </form>
    </div>
  
    
  )
}

export default Form
