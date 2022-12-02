import React from "react";
import styles from "./Input.module.scss";

export default function Input({
  type = "text",
  event,
  style,
  placeholder,
  value,
  Inputref,
  status,
}) {
  return (
    <input
      className={styles.input}
      type={type}
      onChange={event}
      style={style}
      placeholder={placeholder}
      defaultValue={value}
      ref={Inputref}
      readOnly={status}
    ></input>
  );
}
