import PotionsRow from "@/components/PotionsRow"
import React from "react"
import styles from "../../styles/versus.module.css"

const StatusBox = () => {
  return (
    <div className={styles.cardContainer}>
        <div className={styles.progressBar}>
          <div className={styles.progress}>

          </div>

        </div>

        <div className={styles.potionsBox}>
          <PotionsRow/>
        </div>
    </div>
  )
}

export default StatusBox