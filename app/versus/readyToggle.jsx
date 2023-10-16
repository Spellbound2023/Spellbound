"use client";

import React from "react";

const ReadyToggle = ({ onClick : onClickHandler }) => {
  function handleReadyCheck(e) {
    let checkStatus = document.getElementById("ready-checkbox").checked;
    console.log("Ready: ", checkStatus);
    onClickHandler(checkStatus);
  }

  return (
    <div>
      <form>
        <input
          id="ready-checkbox"
          onClick={handleReadyCheck}
          type="checkbox"
        />
      </form>
    </div>
  );
};

export default ReadyToggle;
