import React, { useState } from 'react';
import Image from 'next/image'
import styles from '../../../../styles/versus.module.css'


const FreezePotion = ({ freezeOpponent }) => {
  const [animate, setAnimate] = useState(false);

  const handleAnimationEnd = () => {
    setAnimate(false);
  };

  return (
    <div>
      <button 
        type="button" 
        style={{ background: "transparent", padding: "0", border: 'none', cursor: 'pointer' }}
        onClick={() => setAnimate(true)}
      >
        <img 
          src='/images/freezePotion.png' 
          width={50} 
          height={50} 
          className={animate ? styles.growAndShrink : ''} 
          onAnimationEnd={handleAnimationEnd}
        />
      </button>
    </div>
  );
}

export default FreezePotion

