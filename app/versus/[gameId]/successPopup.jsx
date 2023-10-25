'use client'
import React, {useState, useEffect} from 'react'
import styles from '../../../styles/versus/successPopup.module.css'

function SuccessPopup({ isCorrect, setIsCorrect }) {

    const[isVisible, setIsVisible] = useState(false);
    const [willUnmount, setWillUnmount] = useState(false);
    const feedbackClass = isCorrect ? styles.correct : styles.incorrect;

    useEffect(() => {
        if (isCorrect !== null) {
          setIsVisible(true);
      
          const timer = setTimeout(() => {
            setWillUnmount(true); // Trigger unmount animation
            setIsVisible(false);
            setIsCorrect(null);
          }, 1500);
      
          return () => clearTimeout(timer);
        }
      }, [isCorrect]);


  return (
    <div className={`${styles['Popup']} ${feedbackClass} ${isVisible ? styles.visible : ''} ${willUnmount ? 'unmount' : ''}`}>
        {isCorrect === true && <p>Correct!</p>}
        {isCorrect === false && <p>Incorrect!</p>}
    </div>
  )
}

export default SuccessPopup