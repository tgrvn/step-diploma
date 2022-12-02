import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styles from "./Board.module.scss";
import Column from "pages/Board/components/Column/Column";
import { board, createColumn, updateIndexes } from "slices/board";
import boardService from "services/board.service";
import BoardNav from "pages/Board/components/BoardNav/BoardNav";
import AddArea from "components/AddArea/AddArea";

function reorder(list, startIndex, endIndex) {
  const [removed] = list.splice(startIndex, 1);
  list.splice(endIndex, 0, removed);
  list.forEach((item, i) => (item.index = i));

  return list;
}

export default function Board() {
  const dispatch = useDispatch();
  const { boardId } = useParams();

  const { boardData } = useSelector((state) => state.board);
  const [colName, setColName] = useState("");

  function handleCreateCol() {
    dispatch(createColumn({ boardId, name: colName }));
  }

  useEffect(() => {
    dispatch(board(boardId));
  }, [dispatch, boardId]);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = structuredClone(boardData.columns);
    const { type, source, destination } = result;
    const current = items.find((item) => item.id === +source.droppableId);
    const next = items.find((item) => item.id === +destination.droppableId);
    const target = current?.cards[source.index];

    if (type === "COLUMN") {
      reorder(items, source.index, destination.index);

      dispatch(updateIndexes(items));
      boardService.updateIndexes(boardId, items);
    }

    if (type === "CARD") {
      if (source.droppableId === destination.droppableId) {
        reorder(current.cards, source.index, destination.index);

        dispatch(updateIndexes(items));
        boardService.updateIndexes(boardId, items);
      } else {
        target.column_id = next.id;
        current.cards.splice(source.index, 1);
        next.cards.splice(destination.index, 0, target);
        current.cards.forEach((item, i) => (item.index = i));
        next.cards.forEach((item, i) => (item.index = i));

        dispatch(updateIndexes(items));
        boardService.updateIndexes(boardId, items);
      }
    }
  }

  return (
    <div className={styles.board}>
      <div
        className={styles.wrapper}
        style={
          boardData?.theme?.type === "color"
            ? { backgroundColor: boardData?.theme?.hex }
            : { backgroundImage: `url("${boardData?.theme?.img_path}")` }
        }
      ></div>
      <BoardNav members={boardData?.members} />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="columns" direction={"horizontal"} type="COLUMN">
          {(droppableProvided) => (
            <div
              className={styles.columns}
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
            >
              {boardData?.columns &&
                boardData?.columns.map((column, i) => (
                  <Column key={column.id} column={column} index={i} />
                ))}
              {droppableProvided.placeholder}

              <AddArea
                style={{ minWidth: 272, padding: "8px 8px" }}
                state={colName}
                event={(e) => setColName(e.target.value)}
                submitEvent={handleCreateCol}
                btnTitle={"Додати колонку"}
                placeholder={"Назва колонки"}
              />
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Outlet />
    </div>
  );
}
