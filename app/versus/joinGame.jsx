import React from "react";
import styles from "../../styles/lobby.module.css";

const JoinGame = ({
  username,
  isRequester,
  isRequestee,
  respondToRequest,
  cancelRequest,
  sendRequest,
}) => {
  const accept = () => {
    respondToRequest(true, username);
  };

  const reject = () => {
    respondToRequest(false, username);
  };

  const cancel = () => {
    cancelRequest(username);
  };

  const request = () => {
    sendRequest(username);
  };

  if (isRequester) {
    return (
      <div className={styles.userInfoBox}>
        <p>{username}</p>
        <button onClick={accept} className={styles.accept}>Accept</button>
        <button onClick={reject} className={styles.reject}>Reject</button>
      </div>
    );
  }

  if (isRequestee) {
    return (
      <div className={styles.userInfoBox}>
        <p>{username}</p>
        <button onClick={cancel} className={styles.joinButton}>Cancel</button>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.userInfoBox}>
        <p>{username}</p>
        <button onClick={request} className={styles.joinButton}>Request</button>
      </div>
    </div>
  );
};

export default JoinGame;
