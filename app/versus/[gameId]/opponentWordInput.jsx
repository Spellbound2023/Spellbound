import styles from "../../../styles/classic/WordInput.module.css";

const OpponentWordInput = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          id="WordInput"
          name="wordInput"
          className={styles.noinput}
          readOnly
          placeholder=" "
        />
      </div>
    </div>
  );
};

export default OpponentWordInput;
