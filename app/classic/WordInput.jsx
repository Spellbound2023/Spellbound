import styles from "../../styles/classic/WordInput.module.css";

const WordInput = ({ onSubmitHandler, onTypingHandler, frozen, disabled }) => {

  return (
    <div className={styles.mainContainer}>
      <div className={styles.inputContainer}>
        <form>
          <input
            type="text"
            id="wordInput"
            name="wordInput"
            className={styles.input}
            onChange={onTypingHandler}
            disabled={(frozen || disabled) ? true : false}
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
            disabled={(frozen || disabled) ? true : false}
          ></input>
        </form>
      </div>
    </div>
  );
};

export default WordInput;
