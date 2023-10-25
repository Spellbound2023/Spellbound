// Import the required styles
import styles from "../../styles/classic/WordInput.module.css";

// Define a functional component called WordInput
const WordInput = ({ onSubmitHandler, onTypingHandler, frozen }) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.inputContainer}>
        <form>
          {/* Input field for entering a word */}
          <input
            type="text"
            id="wordInput"
            name="wordInput"
            className={styles.input}
            onChange={onTypingHandler}
            disabled={frozen ? true : false}
          ></input>
          <br></br>

          {/* Submit button to confirm the entered word */}
          <input
            type="submit"
            value="Submit"
            className={styles.confirm}
            onClick={(e) => {
              e.preventDefault();
              // Get the value from the input field, trim it, and call the onSubmitHandler
              const input = document.getElementById("wordInput").value.trim();
              document.getElementById("wordInput").value = "";
              onSubmitHandler(input);
            }}
            disabled={frozen ? true : false}
          ></input>
        </form>
      </div>
    </div>
  );
};

// Export the WordInput component for use in other parts of the application
export default WordInput;
