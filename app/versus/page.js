"use client";

import React, { useEffect } from "react";
import styles from "../../styles/lobby.module.css";
import JoinGame from "./joinGame";
import JoinGameTest from "./joinGameTest";
import ReadyToggle from "./readyToggle";
import io from "socket.io-client";

let socket;

const page = () => {
  useEffect(() => {
    // await fetch("/api/socket/");
    socket = io("localhost:3001/api/socket/");

    socket.on("connect", () => {
      console.log("connected");
    });
  }, []);

  // Returns active players in table format displaying username, status and
  return (
    <>
      <h1 className={styles.Header}>Lobby</h1>
      <div className={styles.tableContainer}>
        <ReadyToggle />
        <div id="users-container"></div>
      </div>
    </>
  );
};

export default page;

{
  /* <table className={styles.lobbyList}>
<tr>
  <th>Username</th>
  <th>Status</th>
</tr>
<tr>
  <td>Username placeholder</td>
  <td>
    <JoinGame />
  </td>
</tr>
<tr>
  <td>Username placeholder</td>
  <td>
    <JoinGame />
  </td>
</tr>
{/* <JoinGameTest /> */
}
// </table> */}
