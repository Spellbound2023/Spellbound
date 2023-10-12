'use client'

import React from 'react'
import Image from 'next/image'

const HintPotion = () => {
  return (
    <div>
        <button type="button" class="Potion">
            <Image src='/images/hintPotion.png' width={50} height={50}/>
        </button>

    </div>
  )
}

export default HintPotion