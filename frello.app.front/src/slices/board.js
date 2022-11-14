import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import boardService from "../services/board.service";
import cardService from "../services/card.service";
import columnServeice from "../services/column.service";

const initialState = {
  boardData: null,
  isBoardLoad: false,
};

export const board = createAsyncThunk("board/show", async (boardId) => {
  try {
    const data = await boardService.getBoard(boardId);
    return { board: data.data };
  } catch (error) {
    console.log(error);
  }
});

export const createBoard = createAsyncThunk(
  "board/create",
  async ({ name, theme_type, theme_id }) => {
    try {
      const data = await boardService.createBoard({
        name,
        theme_type,
        theme_id,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateBoard = createAsyncThunk(
  "board/update",
  async ({ name, theme_type, theme_id, boardId }) => {
    try {
      const data = await boardService.updateBoard({
        name,
        theme_type,
        theme_id,
        boardId,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createColumn = createAsyncThunk(
  "boad/create-column",
  async ({ boardId, name }) => {
    try {
      const data = await columnServeice.create(boardId, name);
      return { column: data.data };
    } catch (error) {
      console.log(error);
    }
  }
);

export const dropColumn = createAsyncThunk(
  "boad/drop-column",
  async ({ boardId, columnId }, thunkApi) => {
    try {
      const data = await columnServeice.drop(boardId, columnId);
      thunkApi.dispatch(dropColumnReducer(columnId));
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createCard = createAsyncThunk(
  "boad/create-card",
  async ({ boardId, columnId, name }) => {
    try {
      const data = await cardService.create(boardId, columnId, name);
      return { card: data.data };
    } catch (error) {
      console.log(error);
    }
  }
);

export const excludeUser = createAsyncThunk(
  "board/exlude-user",
  async ({ boardId, userId }, thunkApi) => {
    try {
      const data = await boardService.excludeUser(boardId, userId);
      thunkApi.dispatch(filterUsers(userId));
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteCard = createAsyncThunk(
  "card/drop",
  async ({ boardId, cardId, columnId }, thunkAPI) => {
    try {
      const data = await cardService.deleteCard(boardId, cardId);
      thunkAPI.dispatch(dropCard({ columnId, cardId }));
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    updateIndexes: (state, action) => {
      state.boardData.columns = action.payload;
    },
    filterUsers: (state, action) => {
      const { members } = state.boardData;

      members.splice(
        members.findIndex((member) => member.id === action.payload),
        1
      );
    },
    updateColumn: (state, action) => {
      const { columns } = state.boardData;
      const { title, id } = action.payload;
      const currentColumn = columns.find((column) => column.id === id);
      currentColumn.name = title;
    },
    dropColumnReducer: (state, action) => {
      const { columns } = state.boardData;

      columns.splice(
        columns.findIndex((column) => column.id === action.payload),
        1
      );
    },
    dropCard: (state, action) => {
      const { columns } = state.boardData;
      const { columnId, cardId } = action.payload;

      const cards = columns.find((col) => col.id === columnId).cards;

      cards.splice(
        cards.findIndex((card) => card.id === cardId),
        1
      );
    },
  },
  extraReducers: {
    [board.fulfilled]: (state, action) => {
      state.isBoardLoad = false;
      state.boardData = { ...state.boardData, ...action.payload.board };
    },
    [board.pending]: (state) => {
      state.isBoardLoad = true;
    },
    [board.rejected]: (state) => {
      state.isBoardLoad = false;
    },
    [createCard.fulfilled]: (state, action) => {
      const { card } = action.payload;
      const { columns } = state.boardData;

      const column = columns?.find((column) => +column.id === +card.column_id);
      column?.cards.push(card);
    },
    [createColumn.fulfilled]: (state, action) => {
      const { columns } = state.boardData;
      columns.push(action.payload.column.data);
    },
  },
});

const { reducer } = boardSlice;
export const {
  updateIndexes,
  filterUsers,
  updateColumn,
  dropColumnReducer,
  dropCard,
} = boardSlice.actions;
export default reducer;
