import React from 'react';
import styles from "../styles/classic/GameBox.module.css";

const GameboxCard = ({ children }) => {
    return (
        <div className={styles.mainContainer}>
            {children}
        </div>
    );
};

export default GameboxCard;
