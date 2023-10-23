'use client'

import React from 'react'
import Image from 'next/image'

const HintPotion = ({onClick}) => {

  
  return (
    <div>
        <button onClick={onClick} type="button" style={{ background: "transparent", padding: "0", border: 'none', cursor: 'pointer' }}>
            <img src='/images/hintPotion.png' width={50} height={50}/>
        </button>

    </div>
  )
}

export default HintPotion