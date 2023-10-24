'use client'
import React, {useState, useEffect} from 'react'
import styles from '../../../styles/versus/messagePopup.module.css'

function MessagePopup({ message, activeTime, setPopupMessage, setPopupActiveTime }) {

    const[isVisible, setIsVisible] = useState(false);
    const [willUnmount, setWillUnmount] = useState(false);

    useEffect(() => {
        if (message) {
          setIsVisible(true);

          let time = activeTime ? activeTime : 2000;
      
          const timer = setTimeout(() => {
            setWillUnmount(true); // Trigger unmount animation
            setIsVisible(false);
            setPopupMessage(null);
            setPopupActiveTime(0)
          }, time);
      
          return () => clearTimeout(timer);
        }
      }, [message]);


  return (
    <div className={`${styles['Popup']} ${isVisible ? styles.visible : ''} ${willUnmount ? 'unmount' : ''}`}>
      <p>{message}</p>
    </div>
  )
}

export default MessagePopup