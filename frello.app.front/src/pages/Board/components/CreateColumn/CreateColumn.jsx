import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import Button from "../ui/button/Button";
import Textarea from "../ui/textarea/Textarea";
import AddButton from "../ui/add-button/AddButton";
import { board } from "../../slices/board";
import columnService from "../../services/column.service";
import { useAutoResizeTextarea } from "../../hooks/useAutoResizeTextarea";
import { useClickOutside } from "../../hooks/useClickOutside";
import styles from "./CreateColumn.module.scss";

export default function CreateColumn({ boardId }) {
  const dispatch = useDispatch();

  const [isCreating, setIsCreating] = useState(false);
  const [initialValue, setInitialValue] = useState("");
  const textareaRef = useRef();

  useClickOutside(textareaRef, () => setIsCreating(false));
  const resize = useAutoResizeTextarea(textareaRef, initialValue);

  function handleCreate() {
    columnService.create(boardId, initialValue);
    dispatch(board(boardId));
    setIsCreating(false);
    setInitialValue("");
  }

  return (
    <div
      className={styles.create}
      style={isCreating ? { padding: "10px 8px" } : null}
    >
      {isCreating ? (
        <div ref={textareaRef}>
          <Textarea event={(e) => setInitialValue(e.target.value)} />
          <Button
            text={"Додати"}
            style={{ padding: "8px 10px", fontSize: "14px", margin: "14px 0" }}
            event={handleCreate}
          />
        </div>
      ) : (
        <AddButton
          text={"Додати колонку"}
          style={{ padding: "10px 8px" }}
          event={() => setIsCreating(true)}
        />
      )}
    </div>
  );
}
