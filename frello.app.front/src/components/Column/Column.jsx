import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { createCard, dropColumn, updateColumn } from "../../slices/board";
import styles from "./Column.module.scss";
import Card from "../Card/Card";
import columnServeice from "../../services/column.service";
import EditableTitle from "../ui/editable-title/EditableTitle";
import AddArea from "../AddArea/AddArea";

export default function Column({ column, index }) {
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const [title, setTitle] = useState(null);

  const [initialValues, setInitialValues] = useState({
    boardId: boardId,
    columnId: column.id,
    name: null,
  });

  function handleUpdate() {
    if (column.name !== title && title !== null) {
      dispatch(updateColumn({ id: column.id, title }));
      columnServeice.update(boardId, column.id, title);
    }
  }

  function handleDrop() {
    dispatch(dropColumn({ boardId, columnId: column.id }));
  }

  function handleCreateCard() {
    dispatch(createCard(initialValues));
  }

  return (
    <Draggable draggableId={`${column.id} + ${column.name}`} index={index}>
      {(provided) => (
        <div
          className={styles.column}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className={styles.head} {...provided.dragHandleProps}>
            <EditableTitle
              defaultValue={column.name}
              textClass={"sm-text-reg"}
              state={title}
              onChange={(e) => setTitle(e.target.value)}
              submitHandle={handleUpdate}
            />
            <span className={styles.close} onClick={handleDrop}></span>
          </div>
          <Droppable
            droppableId={`${column.id}`}
            direction={"vertical"}
            type="CARD"
          >
            {(cardsDroppable) => (
              <div
                className={styles.cards}
                ref={cardsDroppable.innerRef}
                {...cardsDroppable.droppableProps}
              >
                {column.cards &&
                  column.cards.map((card, index) => (
                    <Card
                      boardId={boardId}
                      key={card.id}
                      card={card}
                      index={index}
                    />
                  ))}
                {cardsDroppable.placeholder}
              </div>
            )}
          </Droppable>
          <div className={styles.footer}>
            <AddArea
              event={(e) =>
                setInitialValues({ ...initialValues, name: e.target.value })
              }
              submitEvent={handleCreateCard}
              btnTitle={"Додати картку"}
              style={{ width: "100%" }}
              placeholder={"Назва картки"}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
}
