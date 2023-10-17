import React from "react"
import styles from "../../styles/versus.module.css"

const OpponentStatusBox = () => {
  return (
        <div className={styles.progressBar} style={{ width: "80%" }}>  {/* Inline style added here */}
          <div className={styles.progress}>

          </div>
        </div>
  )
}

export default OpponentStatusBox
