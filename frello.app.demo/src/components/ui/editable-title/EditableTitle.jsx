import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";
import Button from "../button/Button";
import Textarea from "../textarea/Textarea";
import styles from "./EditableTitle.module.scss";

export default function EditableTitle({
  defaultValue,
  state,
  onChange,
  style,
  textAreaStyle = {},
  withButton = false,
  textClass = "",
  btnText,
  btnStyle,
  submitHandle,
}) {
  const editArea = useRef();
  const [isEdit, setIsEdit] = useState(false);

  useClickOutside(editArea, () => {
    setIsEdit(false);
  });

  function handleKeyPress(e) {
    if (!withButton) {
      if (e.key === "Escape") {
        setIsEdit(false);
      }

      if (e.key === "Enter") {
        e.preventDefault();
        setIsEdit(false);
        submitHandle();
      }
    }
  }

  return (
    <div
      style={style}
      ref={editArea}
      onKeyDown={handleKeyPress}
      className={`${styles.editArea} ${textClass}`}
    >
      {isEdit ? (
        <Textarea
          style={{
            ...textAreaStyle,
            fontSize: "inherit",
            fontWeight: "inherit",
            padding: "inherit",
          }}
          state={state}
          defaultValue={defaultValue}
          onChange={onChange}
        />
      ) : (
        <span
          onClick={() => setIsEdit(true)}
          style={{
            display: "block",
            fontSize: "inherit",
            fontWeight: "inherit",
            padding: "inherit",
            cursor: "pointer",
          }}
        >
          {defaultValue}
        </span>
      )}
      {withButton && isEdit ? (
        <Button
          style={{ ...btnStyle, marginTop: "10px", padding: "4px 12px" }}
          text={btnText}
          event={() => {
            submitHandle();
            setIsEdit(false);
          }}
        />
      ) : null}
    </div>
  );
}
