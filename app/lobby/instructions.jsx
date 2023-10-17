'use client'

import React, { useState } from 'react';
import styles from '../../styles/lobby.module.css'
import Close from '../authentication/closeButton';

const InstructionsPopup = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <button onClick={openPopup} className={styles.InstructionsButton}>Instructions</button>
      {isPopupOpen && (
        <div className={styles.instructions}>
          <div className={styles.instructionsContent}>
          <button onClick={closePopup} className={styles.closeButton}>Close</button>
            <h2>Versus Mode Instructions</h2>
            <p>Welcome to the Spelling Bee Competition!
                 In this game, you'll compete against an opponent in a battle of words, strategy, and wits. 
                 Your goal is to either complete the list of words first with the most points or have the most points when the game ends.
            </p>
            <h3>Scoring:</h3>
            <ul>
                <li><b>First Try:</b> Spell a word correctly on your first attempt and earn 3 points.</li>
                <li><b>Second Try:</b> Spell a word correctly on your second attempt and earn 2 points.</li>
                <li><b>Third Try:</b> Spell a word correctly on your third attempt and earn 1 point.</li>
                <li><b>Fail:</b> If you fail to spell a word correctly in three tries, you receive 0 points.</li>
                <li><b>Skip:</b>If you choose to skip a word, you lose 1 point. Use this option wisely!</li>
            </ul>

            <h3>Potions:</h3>
            <p>Potions are powerful tools to help you gain an advantage over your opponent. You can earn potions in two ways:</p>
            <ol>
                <li><b>Streak of 3:</b> Successfully spell three words in a row without any failures or skips, and you'll earn a potion.</li>
                <li><b>Completion Milestones:</b> Reach specific points milestones, and you'll receive additional potions.</li>
            </ol>
            <p>To use a potion, click on the one you want to activate. Each potion has a unique ability that can turn the tide of the game in your favor.</p>

            <h3>Game Strategy:</h3>
            <ul>
                <li>Pay attention to the words and spell them correctly on your first attempt whenever possible to earn maximum points.</li>
                <li>Plan your skips wisely. Using a skip costs you points, so reserve it for challenging words.</li>
                <li>Keep an eye on your streaks. A streak of 3 earns you a precious potion.</li>
                <li>Utilize your potions strategically to gain an edge over your opponent.</li>
            </ul>

            <h3>Winning the Game:</h3>
            <p>
            The game ends when either you or your opponent completes the list of words, or when a specified time limit is reached.
             The player with the most points at the end of the game is the winner.
             </p>
            <p>Now that you're familiar with the rules and strategies of the Spelling Bee Competition,
                 it's time to show off your spelling skills and outsmart your opponent. Good luck, and may the best speller win!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructionsPopup;
