import React from "react";
import styles from "../../styles/lobby.module.css";

//a function that allows players to join and request players
const JoinGame = ({
  //takes in props needed
  username,
  isRequester,
  isRequestee,
  respondToRequest,
  cancelRequest,
  sendRequest,
}) => {
  //accept an incoming request by responding to sender
  const accept = () => {
    respondToRequest(true, username);
  };
  //rejects request from sender
  const reject = () => {
    respondToRequest(false, username);
  };

  //retracts request sent to other user
  const cancel = () => {
    cancelRequest(username);
  };

  //sends a request to player chosen 
  const request = () => {
    sendRequest(username);
  };

  //if person on recieving end of request, have option to accept or reject
  if (isRequester) {
    return (
      <div className={styles.userInfoBox}>
        <p>{username}</p>
        <button onClick={accept} className={styles.accept}>Accept</button>
        <button onClick={reject} className={styles.reject}>Reject</button>
      </div>
    );
  }

  //if sending the request, wait for request or cancel your request
  if (isRequestee) {
    return (
      <div className={styles.userInfoBox}>
        <p>{username}</p>
        <button onClick={cancel} className={styles.joinButton}>Cancel</button>
      </div>
    );
  }

  return (
    //display user info, and appropriate buttons based on gamestate
    <div>
      <div className={styles.userInfoBox}>
        <p>{username}</p>
        <button onClick={request} className={styles.joinButton}>Request</button>
      </div>
    </div>
  );
};

export default JoinGame;
