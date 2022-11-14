import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addChecklist } from "../../slices/card";
import Button from "../ui/button/Button";
import Input from "../ui/input/Input";
import styles from "./ChecklistCreate.module.scss";

export default function ChecklistCreate() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const { boardId, cardId } = useParams();

  function handleCreate() {
    dispatch(addChecklist({ boardId, cardId, name }));
  }

  return (
    <div className={styles.check}>
      <div className={styles.head}>
        <span>Стовири чек-ліст</span>
        <div className="hr" style={{ margin: "10px 0" }}></div>
      </div>

      <span className="sm-text-blue">Назва</span>
      <div className={styles.checkCreate}>
        <Input
          type={"text"}
          placeholder={"Введіть назву чек-ліста"}
          event={(e) => setName(e.target.value)}
        />
        {name.length > 0 ? (
          <Button
            text={"Створити"}
            event={handleCreate}
            style={{ width: "100%", marginTop: "14px", padding: "6px 0" }}
          />
        ) : null}
      </div>
    </div>
  );
}
