import React from 'react'
import Image from 'next/image'

const FreezePotion = ({ freezeOpponent }) => {

  
  return (
    <div>
      <button type="button" onClick={freezeOpponent} style={{ background: "transparent", padding: "0", border: 'none', cursor: 'pointer' }}>
            <img src='/images/freezePotion.png' width={50} height={50}/>
        </button>
    </div>
  )
}

export default FreezePotion