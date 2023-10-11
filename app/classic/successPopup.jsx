'use client'
import React, {useState, useEffect} from 'react'
import styles from '../../styles/classic/page.module.css'

function SuccessPopup({ isCorrect }) {
    //STILL TO DO:
    //add correct answer onto incorrect popup when attempts remaining is 0.
    //implement proper functionality once new rand word generator is made

    const[isVisible, setIsVisible] = useState(false);
    const feedbackClass = isCorrect ? styles.correct : styles.incorrect;

    useEffect(() => {
        if(isCorrect !== null) {
            setIsVisible(true);

        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
        }
    }, [isCorrect]);


  return (
    <div className={`${styles['Popup']} ${feedbackClass} ${isVisible ? styles.visible : ''}`}>
        {isCorrect === true && <p>Correct!</p>}
        {isCorrect === false && <p>Incorrect!</p>}
    </div>
  )
}

export default SuccessPopup