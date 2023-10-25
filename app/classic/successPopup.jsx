'use client'
import React, { useState, useEffect } from 'react'
import styles from '../../styles/classic/page.module.css'

// Create a functional component named SuccessPopup
function SuccessPopup({ isCorrect }) {
    // Define state variables using the useState hook
    const [isVisible, setIsVisible] = useState(false);
    const [willUnmount, setWillUnmount] = useState(false);

    // Determine the CSS class for the feedback (correct or incorrect)
    const feedbackClass = isCorrect ? styles.correct : styles.incorrect;

    // Use the useEffect hook to handle changes in the 'isCorrect' prop
    useEffect(() => {
        if (isCorrect !== null) {
            // Show the popup when 'isCorrect' is not null
            setIsVisible(true);

            // Set a timer to trigger unmount animation and hide the popup after 1500 milliseconds
            const timer = setTimeout(() => {
                setWillUnmount(true); // Trigger unmount animation
                setIsVisible(false);
            }, 1500);

            // Clean up the timer when the component unmounts or when 'isCorrect' changes
            return () => clearTimeout(timer);
        }
    }, [isCorrect]);

    // Render the component with conditional content based on the 'isCorrect' prop
    return (
        <div className={`${styles['Popup']} ${feedbackClass} ${isVisible ? styles.visible : ''} ${willUnmount ? 'unmount' : ''}`}>
            {isCorrect === true && <p>Correct!</p>}
            {isCorrect === false && <p>Incorrect!</p>}
        </div>
    )
}

export default SuccessPopup