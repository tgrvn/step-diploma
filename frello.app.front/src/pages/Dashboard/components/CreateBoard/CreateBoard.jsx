import React from "react";
import styles from "./CreateBoard.module.scss";

export default function CreateBoard({ event }) {
  return (
    <div className={styles.card} onClick={event}>
      <span className={styles.fade}></span>
      <h6 className={styles.title}>Створити дошку</h6>
    </div>
  );
}
