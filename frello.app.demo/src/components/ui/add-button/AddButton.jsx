import React from "react";
import styles from "./AddButton.module.scss";

export default function AddButton({ event, style, className, text, ico }) {
  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={event}
      style={style}
    >
      <span className={styles.text}>
        {text}
        <span className={`${styles.icon} ${ico}`}></span>
      </span>
    </button>
  );
}
