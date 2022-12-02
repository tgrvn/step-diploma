import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styles from "./Column.module.scss";
import Card from "pages/Board/components/Card/Card";
import EditableTitle from "components/ui/editable-title/EditableTitle";
import AddArea from "components/AddArea/AddArea";
import { useDispatch } from "react-redux";
import { createCard, dropCol, updateColTitle } from "redux/slices/boardSlice";

export default function Column({ column, index }) {
  const [title, setTitle] = useState("");
  const [cardName, setCardName] = useState("");
  const dispatch = useDispatch();

  function handleDropCol() {
    dispatch(dropCol(column.id));
  }

  function handleUpdateTitle() {
    if (title !== "") {
      dispatch(updateColTitle({ id: column.id, name: title }));
    }
  }

  function handleCreateCard() {
    if (cardName !== "") {
      dispatch(createCard({ id: column.id, name: cardName }));
    }
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
              submitHandle={handleUpdateTitle}
            />
            <span className={styles.close} onClick={handleDropCol}></span>
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
                      columnId={column.id}
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
              event={(e) => setCardName(e.target.value)}
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
