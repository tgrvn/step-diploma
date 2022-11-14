import React from "react";
import styles from "./Card.module.scss";
import { Draggable } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";

export default function Card({ card, index, boardId }) {
  const navigate = useNavigate();

  return (
    <Draggable draggableId={`Card-${card.name}-${card.id}`} index={index}>
      {(draggableProvided) => (
        <div
          className={styles.card}
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          onClick={() => navigate(`/board/${boardId}/card/${card.id}`)}
        >
          <span
            style={{ display: "block", paddingBottom: "16px" }}
            className="sm-text-reg"
          >
            {card.name}
          </span>
          <div className={styles.stat}>
            {card?.comments > 0 ? (
              <span className={styles.comments}>{card?.comments}</span>
            ) : null}

            {card?.checklists > 0 ? (
              <span className={styles.checklists}>{card?.checklists}</span>
            ) : null}

            {card?.members > 0 ? (
              <span className={styles.members}>{card?.members}</span>
            ) : null}
          </div>
        </div>
      )}
    </Draggable>
  );
}
