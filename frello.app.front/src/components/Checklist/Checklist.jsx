import React, { useEffect, useState } from "react";
import Button from "../ui/button/Button";
import styles from "./Checklist.module.scss";
import EditableTitle from "../ui/editable-title/EditableTitle";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import {
  createTask,
  deleteCheck,
  deleteTask,
  switchStateTask,
  updateTask,
} from "../../slices/card";
import { useParams } from "react-router-dom";
import Textarea from "../ui/textarea/Textarea";
import { useClickOutside } from "../../hooks/useClickOutside";
import Checkbox from "../ui/checkbox/Checkbox";

export default function Checklist({ checklist }) {
  const dispatch = useDispatch();
  const createAreaRef = useRef();
  const [title, setTitle] = useState(null);
  const [checkItemText, setCheckItemText] = useState(null);
  const [tasks, setTasks] = useState([...checklist.tasks]);
  const [taskName, setTaskName] = useState("");
  const [isCreateTask, setCreateTask] = useState(false);
  const [percent, setPercent] = useState(0);
  const progressRef = useRef();
  const { boardId, cardId } = useParams();

  useClickOutside(createAreaRef, () => setCreateTask(false));

  useEffect(() => {
    setTasks([...checklist.tasks]);
  }, [setTasks, checklist.tasks]);

  useEffect(() => {
    const progress = {
      tasksCount: 0,
      doneCount: 0,
    };

    tasks.forEach((item) => {
      progress.tasksCount++;

      if (item.is_done) {
        progress.doneCount++;
      }
    });

    const width = (100 / progress.tasksCount) * progress.doneCount;

    setPercent(Math.floor(width));
    progressRef.current.style.width = width + "%";
    progressRef.current.style.borderRadius = "5px 0 0 5px";
    progressRef.current.style.backgroundColor = "#5ba4cf";

    if (width === 100) {
      progressRef.current.style.borderRadius = "10px";
      progressRef.current.style.backgroundColor = "#61BD4F";
    }

    if (progress.tasksCount === 0) {
      progressRef.current.style.width = 0 + "%";
      setPercent(0);
    }
  }, [progressRef, tasks]);

  return (
    <div className={styles.checkList}>
      <div className={`md-text ${styles.head}`}>
        <EditableTitle
          onChange={(e) => setTitle(e.target.value)}
          defaultValue={checklist.name}
          state={title}
          style={{ flexGrow: "1" }}
          btnText={"Зберегти"}
          withButton={true}
        />
        <Button
          text={"Видалити"}
          style={{ padding: "4px 14px", fontWeight: "300" }}
          event={() =>
            dispatch(deleteCheck({ boardId, cardId, checkId: checklist.id }))
          }
        />
      </div>
      <div className={styles.progress}>
        <span className={styles.percent}>{percent}%</span>
        <div className={styles.progressBar}>
          <span ref={progressRef} className={styles.fill}></span>
        </div>
      </div>
      <ul className={styles.tasks}>
        {checklist?.tasks &&
          checklist?.tasks.map((task) => (
            <li key={task.id} className={styles.task}>
              <Checkbox
                task={task}
                onChange={() =>
                  dispatch(
                    switchStateTask({
                      boardId,
                      cardId,
                      checkId: checklist.id,
                      taskId: task.id,
                    })
                  )
                }
              />
              <EditableTitle
                textClass={"sm-text"}
                defaultValue={task.name}
                btnText={"Зберегти"}
                withButton={true}
                onChange={(e) => setCheckItemText(e.target.value)}
                state={checkItemText}
                style={{ width: "100%", paddingRight: "24px" }}
                submitHandle={() =>
                  dispatch(
                    updateTask({
                      boardId,
                      cardId,
                      checkId: checklist.id,
                      taskId: task.id,
                      name: checkItemText,
                    })
                  )
                }
              />
              <span
                className={styles.tasksClose}
                onClick={() =>
                  dispatch(
                    deleteTask({
                      boardId,
                      cardId,
                      checkId: checklist.id,
                      taskId: task.id,
                    })
                  )
                }
              ></span>
            </li>
          ))}
        {isCreateTask ? (
          <div ref={createAreaRef} style={{ marginTop: "10px" }}>
            <Textarea
              style={{ height: "25px", padding: "1px 6px" }}
              state={taskName}
              placeholder={"Назва завдання"}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <Button
              text={"Додати завдання"}
              style={{ marginTop: "10px", padding: "6px 8px" }}
              event={() =>
                dispatch(
                  createTask({
                    boardId,
                    cardId,
                    checkId: checklist.id,
                    name: taskName,
                  })
                )
              }
            />
          </div>
        ) : (
          <Button
            text={"Додати завдання"}
            style={{ padding: "6px 8px", marginTop: "10px" }}
            event={() => setCreateTask(true)}
          />
        )}
      </ul>
    </div>
  );
}
