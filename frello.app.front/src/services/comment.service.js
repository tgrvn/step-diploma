import axios from "axios";
import authHeader from "./authHeader";

const CREATE_URL = "http://127.0.0.1:8000/api/boards/id/create-comment/cardId";
const DELETE_URL =
  "http://127.0.0.1:8000/api/boards/id/delete-comment/cardId/commentId";
const UPDATE_URL =
  "http://127.0.0.1:8000/api/boards/id/update-comment/cardId/commentId";

const createComment = (boardId, cardId, body) => {
  const URL = CREATE_URL.replace("id", boardId).replace("cardId", cardId);
  return axios.post(URL, { body }, { headers: authHeader() });
};

const deleteComment = (boardId, cardId, commentId) => {
  const URL = DELETE_URL.replace("id", boardId)
    .replace("cardId", cardId)
    .replace("commentId", commentId);
  return axios.delete(URL, { headers: authHeader() });
};

const updateComment = (boardId, cardId, commentId, body) => {
  const URL = UPDATE_URL.replace("id", boardId)
    .replace("cardId", cardId)
    .replace("commentId", commentId);
  return axios.patch(URL, { body }, { headers: authHeader() });
};

const commentService = { createComment, deleteComment, updateComment };
export default commentService;
