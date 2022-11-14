import axios from "axios";
import authHeader from "./authHeader";

const GET_URL = "http://127.0.0.1:8000/api/boards/id/card/cardId";
const CREATE_URL = "http://127.0.0.1:8000/api/boards/id/columnId/create-card";
const UPDATE_NAME_URL =
  "http://127.0.0.1:8000/api/boards/id/update-card-name/cardId";
const UPDATE_DESCR_URL =
  "http://127.0.0.1:8000/api/boards/id/update-card-descr/cardId";
const DELETE_CARD_URL =
  "http://127.0.0.1:8000/api/boards/id/delete-card/cardId";
const EXLCLUDE_USER_URL =
  "http://127.0.0.1:8000/api/boards/id/add-card-member/cardId/userId";

const getCard = (boardId, cardId) => {
  const URL = GET_URL.replace("id", boardId).replace("cardId", cardId);

  return axios
    .get(URL, { headers: authHeader() })
    .then((response) => response.data);
};

const create = (boardId, columnId, name) => {
  const URL = CREATE_URL.replace("id", boardId).replace("columnId", columnId);

  return axios
    .post(URL, { name }, { headers: authHeader() })
    .then((response) => response.data);
};

const updateName = (boardId, cardId, name) => {
  const URL = UPDATE_NAME_URL.replace("id", boardId).replace("cardId", cardId);

  return axios
    .patch(URL, { name }, { headers: authHeader() })
    .then((response) => response.data);
};

const updateDescr = (boardId, cardId, name) => {
  const URL = UPDATE_DESCR_URL.replace("id", boardId).replace("cardId", cardId);

  return axios
    .patch(URL, { name }, { headers: authHeader() })
    .then((response) => response.data);
};

const deleteCard = (boardId, cardId) => {
  const URL = DELETE_CARD_URL.replace("id", boardId).replace("cardId", cardId);

  return axios
    .delete(URL, { headers: authHeader() })
    .then((response) => response.data);
};

const cardMember = (boardId, cardId, userId) => {
  const URL = EXLCLUDE_USER_URL.replace("id", boardId)
    .replace("cardId", cardId)
    .replace("userId", userId);

  return axios
    .post(URL, {}, { headers: authHeader() })
    .then((response) => response.data);
};

const cardService = {
  create,
  getCard,
  updateName,
  updateDescr,
  deleteCard,
  cardMember,
};

export default cardService;
