import React, { useRef } from "react";
import { useAutoResizeTextarea } from "../../../hooks/useAutoResizeTextarea";
import styles from "./Textarea.module.scss";

export default function Textarea({
  state,
  defaultValue,
  onChange,
  placeholder,
  style,
  className,
}) {
  const textareaRef = useRef();
  useAutoResizeTextarea(textareaRef, state);

  return (
    <textarea
      className={`${styles.textarea} ${className}`}
      ref={textareaRef}
      style={style}
      defaultValue={defaultValue}
      onChange={onChange}
      placeholder={placeholder}
    ></textarea>
  );
}
