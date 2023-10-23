import React from 'react'
import Image from 'next/image'

const FreezePotion = ({ onClick }) => {
  
  
  return (
    <div>
      <button type="button" onClick={onClick} style={{ background: "transparent", padding: "0", border: 'none', cursor: 'pointer' }}>
            <img src='/images/freezePotion.png' width={50} height={50}/>
        </button>
    </div>
  )
}

export default FreezePotion