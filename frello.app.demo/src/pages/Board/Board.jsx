import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styles from "./Board.module.scss";
import Column from "pages/Board/components/Column/Column";
import AddArea from "components/AddArea/AddArea";
import backgroundImg from "assets/background.jpg";
import { useDispatch } from "react-redux";
import { createCol, dropCol, updateIndexs } from "redux/slices/boardSlice";

function reorder(list, startIndex, endIndex) {
  const [removed] = list.splice(startIndex, 1);
  list.splice(endIndex, 0, removed);

  return list;
}

export default function Board() {
  const { boardData } = useSelector((state) => state.board);
  const dispatch = useDispatch();
  const [colName, setColName] = useState("");

  function handleCreateCol() {
    if (colName.length > 0) {
      dispatch(createCol(colName));
    }
  }

  function handleDropCol(colId) {}

  function handleRenameCol() {}

  // function handleCreateCard(colId, name) {
  //   const currentCol = boardData.columns.find((col) => col.id === colId);
  //   let lastId = 1;

  //   if (currentCol.cards.length > 0) {
  //     lastId = Math.max(...currentCol.cards.map((item) => item.id)) + 1;
  //   }

  //   const card = {
  //     id: lastId,
  //     column_id: currentCol.id,
  //     name: name,
  //     members: 0,
  //     comments: 0,
  //     checklists: 0,
  //     cardData: {
  //       id: lastId,
  //       name: name,
  //       description: null,
  //       members: [],
  //       checklists: [],
  //       comments: [],
  //     },
  //   };

  //   currentCol.cards.push(card);
  //   setBoardData({ ...boardData, columns: [...boardData.columns] });
  // }

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = structuredClone(boardData.columns);
    const { type, source, destination } = result;
    const current = items.find((item) => item.id === +source.droppableId);
    const next = items.find((item) => item.id === +destination.droppableId);
    const target = current?.cards[source.index];

    if (type === "COLUMN") {
      reorder(items, source.index, destination.index);
    }

    if (type === "CARD") {
      if (source.droppableId === destination.droppableId) {
        reorder(current.cards, source.index, destination.index);
      } else {
        target.column_id = next.id;
        current.cards.splice(source.index, 1);
        next.cards.splice(destination.index, 0, target);
      }
    }

    dispatch(updateIndexs(items));
  }

  return (
    <div className={styles.board}>
      <div
        className={styles.wrapper}
        style={{ backgroundImage: `url(${backgroundImg})` }}
      ></div>
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
                  <Column
                    dropEvent={() => handleDropCol(column.id)}
                    key={column.id}
                    column={column}
                    index={i}
                  />
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
