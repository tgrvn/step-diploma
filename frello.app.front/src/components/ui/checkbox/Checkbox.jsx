import React from "react";
import styles from "./Checkbox.module.scss";

export default function Checkbox({ task, onChange }) {
  return (
    <div className={styles.checkbox}>
      <input
        id={`check_${task.id}`}
        type="checkbox"
        defaultChecked={task.is_done}
        hidden
        onChange={onChange}
      />
      <label htmlFor={`check_${task.id}`}></label>
    </div>
  );
}
