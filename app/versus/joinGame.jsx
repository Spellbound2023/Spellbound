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
      <div>
        <p>{username}</p>
        <button onClick={accept}>Accept</button>
        <button onClick={reject}>Reject</button>
      </div>
    );
  }

  if (isRequestee) {
    return (
      <div>
        <p>{username}</p>
        <button onClick={cancel}>Cancel</button>
      </div>
    );
  }

  return (
    <div>
      {/* <form action="../versus" className={styles.joinButton}>
            <label>{username}</label>
            <input type="submit" value="Join"/>
        </form> */}
      <div>
        <p>{username}</p>
        <button onClick={request}>Request</button>
      </div>
    </div>
  );
};

export default JoinGame;
