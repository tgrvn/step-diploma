import axios from "axios";
import authHeader from "./authHeader";

const BOARD_URL = "http://127.0.0.1:8000/api/boards/";
const CREATE_URL = "http://127.0.0.1:8000/api/create-board";
const EDIT_URL = "http://127.0.0.1:8000/api/boards/id/update-board";
const INDEXES_URL = "http://127.0.0.1:8000/api/boards/id/update-indexes";
const DELETE_URL = "http://127.0.0.1:8000/api/boards/id/delete-board";
const EXCLUDE_URL =
  "http://127.0.0.1:8000/api/boards/id/delete-premission/user_id";

const getBoard = (boardId) => {
  return axios
    .get(BOARD_URL + boardId, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const createBoard = ({ name, theme_type, theme_id }) => {
  return axios.post(
    CREATE_URL,
    { name, theme_type, theme_id },
    { headers: authHeader() }
  );
};

const updateBoard = ({ name, theme_type, theme_id, boardId }) => {
  const URL = EDIT_URL.replace("id", boardId);
  return axios.patch(
    URL,
    { name, theme_type, theme_id },
    { headers: authHeader() }
  );
};

const updateIndexes = (id, data) => {
  const URL = INDEXES_URL.replace("id", id);
  return axios.patch(URL, { data }, { headers: authHeader() });
};

const excludeUser = (boardId, userId) => {
  const URL = EXCLUDE_URL.replace("id", boardId).replace("user_id", userId);
  return axios.delete(URL, { headers: authHeader() });
};

const deleteBoard = (boardId) => {
  const URL = DELETE_URL.replace("id", boardId);
  return axios.delete(URL, { headers: authHeader() });
};

const boardService = {
  getBoard,
  updateIndexes,
  createBoard,
  excludeUser,
  updateBoard,
  deleteBoard,
};

export default boardService;
