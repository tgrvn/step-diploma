import React, { useRef, useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import AddButton from "../ui/add-button/AddButton";
import Button from "../ui/button/Button";
import Textarea from "../ui/textarea/Textarea";
import styles from "./AddArea.module.scss";

export default function AddArea({
  style,
  event,
  submitEvent,
  btnTitle,
  placeholder,
  state,
}) {
  const [isCreating, setIsCreating] = useState(false);
  const textAreaRef = useRef();
  const ref = useRef();

  useClickOutside(ref, () => setIsCreating(false));

  function handleKeyDown({ key }) {
    if (key === "Escape") {
      setIsCreating(false);
    }

    if (key === "Enter") {
      setIsCreating(false);
      submitEvent();
    }
  }

  return (
    <div className={styles.create} style={style} ref={ref}>
      {isCreating ? (
        <div onKeyDown={handleKeyDown}>
          <Textarea
            placeholder={placeholder}
            onChange={event}
            state={state}
            style={{ marginBottom: 14, padding: "4px 6px", fontSize: 15 }}
          />
          <Button
            text={btnTitle}
            event={submitEvent}
            style={{ width: "100%", padding: "6px 0" }}
          />
        </div>
      ) : (
        <AddButton
          ico={"icon-plus"}
          text={btnTitle}
          className={"fix"}
          event={() => setIsCreating(true)}
        />
      )}
    </div>
  );
}
