import React from 'react'
import Image from 'next/image'

const DblPointsPotion = () => {
  return (
    <div >
      <button type="button" style={{ background: "transparent", padding: "0", border: 'none', cursor: 'pointer'}}>
            <img src='/images/dblptsPotion.png' width={50} height={50} />
        </button>
    </div>
  )
}

export default DblPointsPotion

/* 
const styles =  {
    button: {
      flex: 1,
      height: 'auto',
      padding: 0,
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
  },
  image: {
      maxWidth: '100%',
      maxHeight: '100%',
      height: 'auto',
  },
  }
  return (
    <div>
      <button style={styles.button}>
        <img src="/images/dblptsPotion.png" alt="dblpts Potion" style={styles.image} />
    </button>
     */