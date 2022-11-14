import React from "react";
import styles from "./BoardCard.module.scss";

export default function BoardCard({ board, event }) {
  const { name, theme } = board;

  return (
    <div
      className={styles.card}
      onClick={event}
      style={
        theme.type == "background"
          ? { backgroundImage: `url("${theme.img_path}")` }
          : { backgroundColor: `${theme.hex}` }
      }
    >
      <span className={styles.fade}></span>
      <h6 className={styles.title}>{name}</h6>
    </div>
  );
}
