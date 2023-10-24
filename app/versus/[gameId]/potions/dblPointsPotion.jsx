import React, { useState } from 'react';
import Image from 'next/image'
import styles from '../../../../styles/versus.module.css'

const DblPointsPotion = ({onClick}) => {


const [animate, setAnimate] = useState(false);
const handleAnimationEnd = () => {
  setAnimate(false);
};

  return (
    <div >
      <button onClick={onClick} /**setAnimate(true)} */ type="button" style={{ background: "transparent", padding: "0", border: 'none', cursor: 'pointer'}}>
            <img src='/images/dblptsPotion.png' width={50} height={50} />
        </button>
    </div>
  )
}
export default DblPointsPotion

