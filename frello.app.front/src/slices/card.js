import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cardService from "../services/card.service";
import checklistService from "../services/checklist.service";
import commentService from "../services/comment.service";

const initialState = {
  cardData: null,
  isLoaded: false,
};

export const card = createAsyncThunk(
  "card/show",
  async ({ boardId, cardId }) => {
    try {
      const data = await cardService.getCard(boardId, cardId);
      return { card: data.data };
    } catch (error) {
      console.log(error);
    }
  }
);

export const cardUpdateName = createAsyncThunk(
  "card/name",
  async ({ boardId, cardId, name }, thunkAPI) => {
    try {
      thunkAPI.dispatch(updateName(name));
      const data = await cardService.updateName(boardId, cardId, name);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const cardUpdateDescr = createAsyncThunk(
  "card/descr",
  async ({ boardId, cardId, name }, thunkAPI) => {
    try {
      thunkAPI.dispatch(updateDescr(name));
      const data = await cardService.updateDescr(boardId, cardId, name);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const cardMember = createAsyncThunk(
  "card/member",
  async ({ boardId, cardId, userId }, thunkAPI) => {
    try {
      const data = await cardService.cardMember(boardId, cardId, userId);
      return { isRemove: data.data.is_remove, user: data.data.user };
    } catch (error) {
      console.log(error);
    }
  }
);

export const addChecklist = createAsyncThunk(
  "card/check-add",
  async ({ boardId, cardId, name }) => {
    try {
      const data = await checklistService.createCheck(boardId, cardId, name);
      return { checklist: data.data };
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteCheck = createAsyncThunk(
  "card/check-drop",
  async ({ boardId, cardId, checkId }, thunkAPI) => {
    try {
      const data = await checklistService.deleteCheck(boardId, cardId, checkId);
      thunkAPI.dispatch(dropCheck(checkId));
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createTask = createAsyncThunk(
  "card/create-task",
  async ({ boardId, cardId, checkId, name }) => {
    try {
      const data = await checklistService.createTask(
        boardId,
        cardId,
        checkId,
        name
      );
      return { checklist: data.data, checkId };
    } catch (error) {
      console.log(error);
    }
  }
);

export const switchStateTask = createAsyncThunk(
  "card/switch-task",
  async ({ boardId, cardId, checkId, taskId }, thunkAPI) => {
    try {
      const data = await checklistService.switchTaskState(
        boardId,
        cardId,
        checkId,
        taskId
      );
      thunkAPI.dispatch(switchTask({ checkId, taskId }));
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "card/drop-task",
  async ({ boardId, cardId, checkId, taskId }, thunkAPI) => {
    try {
      const data = await checklistService.deleteTask(
        boardId,
        cardId,
        checkId,
        taskId
      );
      thunkAPI.dispatch(dropTask({ checkId, taskId }));
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateTask = createAsyncThunk(
  "card/update-task",
  async ({ boardId, cardId, checkId, taskId, name }, thunkAPI) => {
    try {
      const data = await checklistService.updateTask(
        boardId,
        cardId,
        checkId,
        taskId,
        name
      );
      thunkAPI.dispatch(updateTaskName({ checkId, taskId, name }));
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createComment = createAsyncThunk(
  "comment/create-comment",
  async ({ boardId, cardId, body }) => {
    try {
      const data = await commentService.createComment(boardId, cardId, body);
      return { comment: data.data.data };
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comment/drop-comment",
  async ({ boardId, cardId, commentId }, thunkAPI) => {
    try {
      const data = await commentService.deleteComment(
        boardId,
        cardId,
        commentId
      );
      thunkAPI.dispatch(removeComment(commentId));
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateComment = createAsyncThunk(
  "comment/update-comment",
  async ({ boardId, cardId, commentId, body }, thunkAPI) => {
    try {
      const data = await commentService.updateComment(
        boardId,
        cardId,
        commentId,
        body
      );
      thunkAPI.dispatch(updateCommentBody({ commentId, body }));
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    updateName: (state, action) => {
      state.cardData.name = action.payload;
    },
    updateDescr: (state, action) => {
      state.cardData.description = action.payload;
    },
    dropCheck: (state, action) => {
      const { checklists } = state.cardData;

      checklists.splice(
        checklists.findIndex((check) => check.id === action.payload),
        1
      );
    },
    switchTask: (state, action) => {
      const { checkId, taskId } = action.payload;
      const { checklists } = state.cardData;
      const currentCheck = checklists.find((check) => check.id === checkId);
      const currentTask = currentCheck.tasks.find((task) => task.id === taskId);
      currentTask.is_done = !currentTask.is_done;
    },
    dropTask: (state, action) => {
      const { checkId, taskId } = action.payload;
      const { checklists } = state.cardData;

      const currentCheck = checklists.find((check) => check.id === checkId);
      currentCheck.tasks.splice(
        currentCheck.tasks.findIndex((task) => task.id === taskId),
        1
      );
    },
    updateTaskName: (state, action) => {
      const { checkId, taskId, name } = action.payload;
      const { checklists } = state.cardData;

      const currentCheck = checklists.find((check) => check.id === checkId);
      const currentTask = currentCheck.tasks.find((task) => task.id === taskId);
      currentTask.name = name;
    },
    removeComment: (state, action) => {
      const { comments } = state.cardData;
      comments.splice(
        comments.findIndex((comm) => comm.id === action.payload),
        1
      );
    },
    updateCommentBody: (state, action) => {
      const { comments } = state.cardData;
      const { commentId, body } = action.payload;

      const currentComment = comments.find((comm) => comm.id === commentId);
      currentComment.body = body;
    },
  },
  extraReducers: {
    [card.fulfilled]: (state, action) => {
      state.isLoaded = false;
      state.cardData = { ...action.payload.card };
    },
    [card.pending]: (state) => {
      state.isLoaded = true;
    },
    [card.rejected]: (state) => {
      state.isLoaded = false;
    },
    [cardMember.fulfilled]: (state, action) => {
      const { user } = action.payload;
      const { members } = state.cardData;

      if (!user) {
        return;
      }

      if (!!members.find((memb) => memb.id === user.id)) {
        members.splice(
          members.findIndex((memb) => memb.id === user.id),
          1
        );
      } else {
        members.push(user);
      }
    },
    [addChecklist.fulfilled]: (state, action) => {
      const { checklists } = state.cardData;
      checklists.unshift(action.payload.checklist);
    },
    [createTask.fulfilled]: (state, action) => {
      const { checklist, checkId } = action?.payload;
      const { checklists } = state.cardData;

      const currChecklist = checklists.find((check) => check.id === checkId);
      currChecklist.tasks.push(checklist);
    },
    [createComment.fulfilled]: (state, action) => {
      const { comments } = state.cardData;
      const { comment } = action.payload;
      comments.unshift(comment);
    },
  },
});

const { reducer } = cardSlice;
export const {
  updateName,
  updateDescr,
  memberSwitch,
  dropCheck,
  switchTask,
  dropTask,
  updateTaskName,
  removeComment,
  updateCommentBody,
} = cardSlice.actions;
export default reducer;
