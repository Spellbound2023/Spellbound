"use client";

import { useRouter } from "next/navigation";

const handleSubmit = async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const data = { username, password };
  console.log(data);

  const response = await fetch("api/user/register", {
    method: "post",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.status != 200) {
    alert("Registration failed!");
  } else {
    alert(`User ${username} created!`);
  }
};

export default function SignUp() {
  return (
    <main>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter Username"
            name="username"
            id="username"
          />

          <label>Password</label>
          <input type="password" name="password" id="password" />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Enter Username"
            name="confirm-password"
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </main>
  );
}

// References:
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
