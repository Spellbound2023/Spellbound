import styles from '../../styles/classic/GameBox.module.css'

/* Text input and submit button to validate a typed word */
const WordInput = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.inputContainer}>
        <form action="/page.js">
          <input type="text" id="wordInput" name="wordInput" className={styles.input}></input>
          <br></br>
          <input type="submit" value="Submit" className={styles.confirm}></input>
        </form>
      </div>
    </div>
  );
};

export default WordInput;
