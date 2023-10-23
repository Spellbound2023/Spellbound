import styles from "../../styles/classic/WordInput.module.css";

/* Text input and submit button to validate a typed word */
const WordInput = ({ onSubmitHandler }) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.inputContainer}>
        <form>
          <input
            type="text"
            id="wordInput"
            name="wordInput"
            className={styles.input}
          ></input>
          <br></br>
          <input
            type="submit"
            value="Submit"
            className={styles.confirm}
            onClick={(e) => {
              e.preventDefault();
              const input = document.getElementById("wordInput").value.trim();
              document.getElementById("wordInput").value = "";
              onSubmitHandler(input);
            }}
          ></input>
        </form>
      </div>
    </div>
  );
};

export default WordInput;
