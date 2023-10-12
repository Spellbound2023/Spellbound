import React from 'react'
import Image from 'next/image'

const FreezePotion = () => {
  return (
    <div>
      <button type="button" class="hintPotion">
            <Image src='/images/freezePotion.png' width={50} height={50}/>
        </button>
    </div>
  )
}

export default FreezePotion