import React, { useState } from "react";
import { useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import styles from "./PopOver.module.scss";

export default function PopOver({ btnText, content, style, btnStyle }) {
  const [isVisible, setVisible] = useState(false);
  const popOverRef = useRef();
  useClickOutside(popOverRef, () => setVisible(false));

  return (
    <div className={styles.popOverWrapp} ref={popOverRef} style={style}>
      <button
        className={styles.button}
        onClick={() => setVisible(!isVisible)}
        style={btnStyle}
      >
        <span className={styles.text}>{btnText}</span>
        <span className={styles.icon}></span>
      </button>
      {isVisible ? (
        <div className={styles.popOver}>
          <div className={styles.content}>{content}</div>
        </div>
      ) : null}
    </div>
  );
}
