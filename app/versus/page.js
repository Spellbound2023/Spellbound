"use client";

import React, { useEffect, useState } from "react";
import styles from "../../styles/lobby.module.css";
import JoinGame from "./joinGame";
import JoinGameTest from "./joinGameTest";
import ReadyToggle from "./readyToggle";
import io from "socket.io-client";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import InstructionsPopup from "./instructions";

let socket;

const page = () => {
  const [readyUsers, setReadyUsers] = useState([]);
  const [ready, setReady] = useState(false);
  const [requestees, setRequestees] = useState([]);
  const [requesters, setRequesters] = useState([]);
  const { data: session, status } = useSession();
  const { push } = useRouter();

  const readyStateChange = (ready) => {
    setReady(ready);
    socket.emit("readyStateChange", ready);
  };

  const sendRequest = (requestee) => {
    console.log("Sending request to: ", requestee);
    socket.emit("requesting", requestee);
  };

  const respondToRequest = (isAccepted, requester) => {
    console.log("Responding to: ", requester, " isAccepted: ", isAccepted);
    socket.emit("isAccepted", isAccepted, requester);
  };

  const cancelRequest = (requestee) => {
    console.log("Cancelling request sent to: ", requestee);
    socket.emit("cancelRequest", requestee);
  };

  useEffect(() => {
    console.log(session);
    if (status === "authenticated") {
      // Create a socket connection
      console.log("Connecting web socket");
      socket = io.connect("/lobby", {
        forceNew: true,
        query: { username: session.user.username, ready: ready },
      });

      // Listen for incoming messages
      socket.on("readyUsersChange", (readyUsers) => {
        console.log("Ready users: ", readyUsers);
        setReadyUsers(readyUsers);
      });

      // Listen for incoming messages
      socket.on("requesterRequesteesChange", (requestees, requesters) => {
        console.log("Requestees: ", requestees);
        console.log("Requesters: ", requesters);
        setRequestees(requestees);
        setRequesters(requesters);
      });

      socket.on("redirect", (gameUrl) => {
        push(gameUrl, undefined, { shallow: false });
      });
    }
  }, [status]);

  if (status === "loading") return null;

  if (status === "unauthenticated") redirect("/");

  // create components for the ready users
  let readyUserComponents = readyUsers
    .filter((username) => {
      return username === session.user.username ? false : true;
    })
    .map((username) => {
      return (
        <JoinGame
          username={username}
          key={username}
          isRequester={requesters.indexOf(username) !== -1}
          isRequestee={requestees.indexOf(username) !== -1}
          respondToRequest={respondToRequest}
          cancelRequest={cancelRequest}
          sendRequest={sendRequest}
        />
      );
    });

  // Returns active players in table format displaying username, status and
  return (
    <>
      <h1 className={styles.Header}>Lobby</h1>
      <div className={styles.tableContainer}>
        <table className={styles.lobbyList}>
          <thead>
            <tr>
              <th>Players</th>
              <th>
                <ReadyToggle onClick={readyStateChange} />
              </th>
            </tr>
          </thead>
          <tbody>
            {readyUserComponents.map((userComponent, index) => (
              <tr key={index}>
                <td>
                  <div id="users-container">{userComponent}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <InstructionsPopup />
    </>
  );
};

export default page;
