import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Button from "components/ui/button/Button";
import styles from "./Checklist.module.scss";
import EditableTitle from "components/ui/editable-title/EditableTitle";
import Textarea from "components/ui/textarea/Textarea";
import Checkbox from "components/ui/checkbox/Checkbox";
import { useClickOutside } from "hooks/useClickOutside";
import { useDispatch } from "react-redux";
import {
  addTask,
  deleteTask,
  dropChecklist,
  updateCheckName,
  updateTask,
  updateTaskState,
} from "redux/slices/boardSlice";

export default function Checklist({ checklist }) {
  const dispatch = useDispatch();

  const { cardId, columnId } = useParams();

  const createAreaRef = useRef();
  const progressRef = useRef();

  const [title, setTitle] = useState(null);
  const [percent, setPercent] = useState(0);
  const [taskName, setTaskName] = useState("");
  const [isCreateTask, setCreateTask] = useState(false);
  const [checkItemText, setCheckItemText] = useState("");

  useClickOutside(createAreaRef, () => {
    setCreateTask(false);
    setTaskName("");
  });

  function handleDropCheck() {
    dispatch(dropChecklist({ cardId, columnId, checkId: checklist.id }));
  }

  function handleUpdateCheck() {
    dispatch(
      updateCheckName({ cardId, columnId, checkId: checklist.id, name: title })
    );
  }

  function handleAddTask() {
    if (taskName !== "") {
      dispatch(
        addTask({ cardId, columnId, checkId: checklist.id, name: taskName })
      );
    }
  }

  function handleUpdateTaskName(taskId) {
    if (checkItemText !== "") {
      dispatch(
        updateTask({
          cardId,
          columnId,
          checkId: checklist.id,
          taskId,
          name: checkItemText,
        })
      );
    }
  }

  function handleDropTask(taskId) {
    dispatch(
      deleteTask({
        cardId,
        columnId,
        checkId: checklist.id,
        taskId,
      })
    );
  }

  function handleUpdateTaskState(taskId) {
    dispatch(
      updateTaskState({
        cardId,
        columnId,
        checkId: checklist.id,
        taskId,
      })
    );
  }

  useEffect(() => {
    const progress = {
      tasksCount: 0,
      doneCount: 0,
    };

    checklist.tasks.forEach((item) => {
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
  }, [progressRef, checklist]);

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
          submitHandle={handleUpdateCheck}
        />
        <Button
          text={"Видалити"}
          style={{ padding: "4px 14px", fontWeight: "300" }}
          event={handleDropCheck}
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
                onChange={() => handleUpdateTaskState(task.id)}
              />
              <EditableTitle
                textClass={"sm-text"}
                defaultValue={task.name}
                btnText={"Зберегти"}
                withButton={true}
                onChange={(e) => setCheckItemText(e.target.value)}
                state={checkItemText}
                style={{ width: "100%", paddingRight: "24px" }}
                submitHandle={() => handleUpdateTaskName(task.id)}
              />
              <span
                className={styles.tasksClose}
                onClick={() => handleDropTask(task.id)}
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
              event={handleAddTask}
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
