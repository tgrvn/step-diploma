import { createSlice } from "@reduxjs/toolkit";
import boardData from "demoData/boardData.json";

const initialState = {
  boardData,
  cardData: null,
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    updateIndexs: (state, action) => {
      state.boardData = { ...state.boardData, columns: action.payload };
    },
    createCol: (state, action) => {
      const { columns } = state.boardData;
      const lastId = Math.max(...boardData.columns.map((item) => item.id)) + 1;
      const col = { id: lastId, name: action.payload, cards: [] };

      state.boardData = {
        ...state.boardData,
        columns: [...columns, col],
      };
    },
    dropCol: (state, action) => {
      const { columns } = state.boardData;
      state.boardData.columns = columns.filter(
        (col) => col.id !== action.payload
      );
    },
    updateColTitle: (state, action) => {
      const { columns } = state.boardData;
      const { id, name } = action.payload;

      const currentCol = columns.find((col) => col.id === id);
      currentCol.name = name;
    },
    createCard: (state, action) => {
      const { columns } = state.boardData;
      const { id, name } = action.payload;

      const currentCol = columns.find((col) => col.id === id);
      const lastId = Math.max(...currentCol.cards.map((item) => item.id)) + 1;

      const card = {
        id: lastId,
        column_id: id,
        name,
        checklists: 0,
        comments: 0,
        members: 0,
        cardData: {
          id: lastId,
          name: name,
          description: null,
          checklists: [],
          comments: [],
          members: [],
        },
      };

      currentCol.cards = [...currentCol.cards, card];
    },
    setCardData: (state, action) => {
      const { cardId, columnId } = action.payload;

      const currentCol = state.boardData.columns.find(
        (col) => col.id === +columnId
      );

      const cardData = currentCol.cards.find((card) => card.id === +cardId);

      state.cardData = { ...cardData.cardData };
    },
    updateCardData: (state, action) => {
      const { cardId, columnId, name, descr } = action.payload;
      const { boardData, cardData } = state;

      const currentCard = boardData.columns
        .find((col) => col.id === +columnId)
        .cards.find((card) => card.id === +cardId);

      if (name) {
        currentCard.name = name;
        cardData.name = name;
      }

      if (descr) {
        cardData.description = descr;
        currentCard.cardData.description = descr;
      }
    },
    dropCard: (state, action) => {
      const { cardId, columnId } = action.payload;

      const currentCol = state.boardData.columns.find(
        (col) => col.id === +columnId
      );

      currentCol.cards = currentCol.cards.filter((card) => card.id !== +cardId);
    },
    addChecklist: (state, action) => {
      const { cardId, columnId, name } = action.payload;
      const { boardData, cardData } = state;

      const currentCard = boardData.columns
        .find((col) => col.id === +columnId)
        .cards.find((card) => card.id === +cardId);

      const lastId =
        Math.max(...currentCard.cardData.checklists.map((item) => item.id)) + 1;

      const checklist = {
        id: lastId,
        name: name,
        tasks: [],
      };

      currentCard.cardData.checklists = [
        ...currentCard.cardData.checklists,
        checklist,
      ];
      currentCard.checklists++;
      cardData.checklists = [...cardData.checklists, checklist];
    },
    dropChecklist: (state, action) => {
      const { cardId, columnId, checkId } = action.payload;
      const { boardData, cardData } = state;

      const currentCard = boardData.columns
        .find((col) => col.id === +columnId)
        .cards.find((card) => card.id === +cardId);

      currentCard.cardData.checklists = currentCard.cardData.checklists.filter(
        (check) => check.id !== checkId
      );
      currentCard.checklists--;
      cardData.checklists = cardData.checklists.filter(
        (check) => check.id !== checkId
      );
    },
    updateCheckName: (state, action) => {
      const { cardId, columnId, checkId, name } = action.payload;
      const { boardData, cardData } = state;

      const currentCard = boardData.columns
        .find((col) => col.id === +columnId)
        .cards.find((card) => card.id === +cardId);

      const currentCheck = currentCard.cardData.checklists.find(
        (check) => check.id === checkId
      );

      const dataCheck = cardData.checklists.find(
        (check) => check.id === checkId
      );

      dataCheck.name = name;
      currentCheck.name = name;
    },
    addTask: (state, action) => {
      const { cardId, columnId, checkId, name } = action.payload;
      const { boardData, cardData } = state;

      const currentCard = boardData.columns
        .find((col) => col.id === +columnId)
        .cards.find((card) => card.id === +cardId);

      const currentCheck = currentCard.cardData.checklists.find(
        (check) => check.id === checkId
      );

      const cardDataCheck = cardData.checklists.find(
        (check) => check.id === checkId
      );

      const lastId = Math.max(...currentCheck.tasks.map((item) => item.id)) + 1;

      const task = {
        id: lastId,
        name,
        is_done: false,
      };

      currentCheck.tasks = [...currentCheck.tasks, task];
      cardDataCheck.tasks = [...cardDataCheck.tasks, task];
    },
    deleteTask: (state, action) => {
      const { cardId, columnId, checkId, taskId } = action.payload;
      const { boardData, cardData } = state;

      const currentCard = boardData.columns
        .find((col) => col.id === +columnId)
        .cards.find((card) => card.id === +cardId);

      const currentCheck = currentCard.cardData.checklists.find(
        (check) => check.id === checkId
      );

      const cardDataCheck = cardData.checklists.find(
        (check) => check.id === checkId
      );

      currentCheck.tasks = currentCheck.tasks.filter(
        (task) => task.id !== taskId
      );

      cardDataCheck.tasks = cardDataCheck.tasks.filter(
        (task) => task.id !== taskId
      );
    },
    updateTask: (state, action) => {
      const { cardId, columnId, checkId, taskId, name } = action.payload;
      const { boardData, cardData } = state;

      const currentCard = boardData.columns
        .find((col) => col.id === +columnId)
        .cards.find((card) => card.id === +cardId);

      const currentCheck = currentCard.cardData.checklists.find(
        (check) => check.id === checkId
      );

      const currentTask = currentCheck.tasks.find((task) => task.id === taskId);

      const cardDataCheck = cardData.checklists.find(
        (check) => check.id === checkId
      );

      const currentDataTask = cardDataCheck.tasks.find(
        (task) => task.id === taskId
      );

      currentTask.name = name;
      currentDataTask.name = name;
    },
    updateTaskState: (state, action) => {
      const { cardId, columnId, checkId, taskId, name } = action.payload;
      const { boardData, cardData } = state;

      const currentCard = boardData.columns
        .find((col) => col.id === +columnId)
        .cards.find((card) => card.id === +cardId);

      const currentCheck = currentCard.cardData.checklists.find(
        (check) => check.id === checkId
      );

      const currentTask = currentCheck.tasks.find((task) => task.id === taskId);

      const cardDataCheck = cardData.checklists.find(
        (check) => check.id === checkId
      );

      const currentDataTask = cardDataCheck.tasks.find(
        (task) => task.id === taskId
      );

      currentTask.is_done = !currentTask.is_done;
      currentDataTask.is_done = !currentDataTask.is_done;
    },
    createComment: (state, action) => {
      const { cardId, columnId, body } = action.payload;
      const { boardData, cardData } = state;

      const currentCard = boardData.columns
        .find((col) => col.id === +columnId)
        .cards.find((card) => card.id === +cardId);

      const lastId = Math.max(...cardData.comments.map((item) => item.id)) + 1;

      const comment = { id: lastId, body, user: { id: 1, username: "test" } };

      currentCard.comments++;
      currentCard.cardData.comments = [
        ...currentCard.cardData.comments,
        comment,
      ];
      cardData.comments = [...cardData.comments, comment];
    },
    updateComment: (state, action) => {
      const { cardId, columnId, commentId, body } = action.payload;
      const { boardData, cardData } = state;

      const currentCard = boardData.columns
        .find((col) => col.id === +columnId)
        .cards.find((card) => card.id === +cardId);

      const currentComment = currentCard.cardData.comments.find(
        (com) => com.id === commentId
      );

      const dataCurrentComment = cardData.comments.find(
        (com) => com.id === commentId
      );

      currentComment.body = body;
      dataCurrentComment.body = body;
    },

    deleteComment: (state, action) => {
      const { cardId, columnId, commentId } = action.payload;
      const { boardData, cardData } = state;

      const currentCard = boardData.columns
        .find((col) => col.id === +columnId)
        .cards.find((card) => card.id === +cardId);

      currentCard.comments = [
        ...currentCard.cardData.comments.filter((com) => com.id !== commentId),
      ];

      cardData.comments = [
        ...cardData.comments.filter((com) => com.id !== commentId),
      ];
    },
  },
});

export const {
  updateIndexs,
  createCol,
  dropCol,
  updateColTitle,
  createCard,
  setCardData,
  updateCardData,
  dropCard,
  addChecklist,
  dropChecklist,
  updateCheckName,
  addTask,
  deleteTask,
  updateTask,
  updateTaskState,
  createComment,
  updateComment,
  deleteComment,
} = boardSlice.actions;
export default boardSlice.reducer;
