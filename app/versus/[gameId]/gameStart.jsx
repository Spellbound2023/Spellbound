import React, { useState } from "react";

const GameStart = ({ playerReady, opponentReady }) => {
  const [showPopup, setShowPopup] = useState(true);

  const handleReadyClick = () => {
    // Toggle the player's ready status
    playerReady ? opponentReady(true) : playerReady(true);

    // If both players are ready, create the game and close the popup
    if (playerReady && opponentReady) {
      setShowPopup(false);
    }
  };

  return (
    <div className={`popup ${showPopup ? "visible" : "hidden"}`}>
      <div className="popup-content">
        <h2>Are you ready to start the game?</h2>
        <button onClick={handleReadyClick}>Ready</button>
      </div>
    </div>
  );
};

export default GameStart;