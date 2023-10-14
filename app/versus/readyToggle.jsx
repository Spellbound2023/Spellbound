'use client'

import React from 'react'

function handleReadyCheck(e) {
  let checkStatus = document.getElementById("ready-checkbox").checked;
  console.log("Ready: ", checkStatus);
}

const ReadyToggle = () => {
  return (
    <div>
      <form>
        <input id="ready-checkbox" onClick={handleReadyCheck} type="checkbox"/>
      </form>
    </div>
  )
}

export default ReadyToggle
