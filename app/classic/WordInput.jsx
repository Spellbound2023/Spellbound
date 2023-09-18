const WordInput = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.inputContainer}>
        <form action="/page.js">
          <input type="text" id="wordInput" name="wordInput"></input>
          <br></br>
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    </div>
  );
};

export default WordInput;
