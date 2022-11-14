import axios from "axios";
import authHeader from "./authHeader";

const CREATE_URL = "http://127.0.0.1:8000/api/boards/id/create-column";
const DELETE_URL = "http://127.0.0.1:8000/api/boards/id/delete-column/columnId";
const UPDATE_URL = "http://127.0.0.1:8000/api/boards/id/update-column/columnId";

const create = (id, name) => {
  const URL = CREATE_URL.replace("id", id);
  return axios.post(URL, { name }, { headers: authHeader() });
};

const drop = (boardId, columnId) => {
  const URL = DELETE_URL.replace("id", boardId).replace("columnId", columnId);
  return axios.delete(URL, { headers: authHeader() });
};

const update = (boardId, columnId, name) => {
  const URL = UPDATE_URL.replace("id", boardId).replace("columnId", columnId);
  return axios.patch(URL, {name}, { headers: authHeader() });
};

const columnServeice = {
  create,
  drop,
  update,
};

export default columnServeice;
