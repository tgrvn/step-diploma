import React from "react";
import styles from "./ErrorMessage.module.scss";

export default function ErrorMessage({ messages }) {
  return (
    <div className={styles.error}>
      {messages &&
        messages.map((item, i) => (
          <span key={i} className={styles.item}>
            {item}
          </span>
        ))}
    </div>
  );
}
