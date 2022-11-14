import axios from "axios";
import authHeader from "./authHeader";

const CREATE_URL =
  "http://127.0.0.1:8000/api/boards/id/create-checklist/cardId";
const DELETE_URL =
  "http://127.0.0.1:8000/api/boards/id/delete-checklist/cardId/checkId";
const CREATE_TASK_URL =
  "http://127.0.0.1:8000/api/boards/id/create-task/cardId/checkId";
const SWITCH_TASK_URL =
  "http://127.0.0.1:8000/api/boards/id/state-task/cardId/checkId/taskId";
const DELETE_TASK_URL =
  "http://127.0.0.1:8000/api/boards/id/delete-task/cardId/checkId/taskId";
const UPDATE_TASK_URL =
  "http://127.0.0.1:8000/api/boards/id/update-task/cardId/checkId/taskId";

const createCheck = (boardId, cardId, name) => {
  const URL = CREATE_URL.replace("id", boardId).replace("cardId", cardId);
  return axios
    .post(URL, { name }, { headers: authHeader() })
    .then((response) => response.data);
};

const deleteCheck = (boardId, cardId, checkId) => {
  const URL = DELETE_URL.replace("id", boardId)
    .replace("cardId", cardId)
    .replace("checkId", checkId);
  return axios
    .delete(URL, { headers: authHeader() })
    .then((response) => response.data);
};

const createTask = (boardId, cardId, checkId, name) => {
  const URL = CREATE_TASK_URL.replace("id", boardId)
    .replace("cardId", cardId)
    .replace("checkId", checkId);
  return axios
    .post(URL, { name }, { headers: authHeader() })
    .then((response) => response.data);
};

const switchTaskState = (boardId, cardId, checkId, taskId) => {
  const URL = SWITCH_TASK_URL.replace("id", boardId)
    .replace("cardId", cardId)
    .replace("checkId", checkId)
    .replace("taskId", taskId);
  return axios
    .post(URL, {}, { headers: authHeader() })
    .then((response) => response.data);
};

const deleteTask = (boardId, cardId, checkId, taskId) => {
  const URL = DELETE_TASK_URL.replace("id", boardId)
    .replace("cardId", cardId)
    .replace("checkId", checkId)
    .replace("taskId", taskId);
  return axios
    .delete(URL, { headers: authHeader() })
    .then((response) => response.data);
};

const updateTask = (boardId, cardId, checkId, taskId, name) => {
  const URL = UPDATE_TASK_URL.replace("id", boardId)
    .replace("cardId", cardId)
    .replace("checkId", checkId)
    .replace("taskId", taskId);
  return axios
    .patch(URL, { name }, { headers: authHeader() })
    .then((response) => response.data);
};

const checklistService = {
  createCheck,
  deleteCheck,
  createTask,
  switchTaskState,
  deleteTask,
  updateTask,
};

export default checklistService;
