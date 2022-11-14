import axios from "axios";
import authHeader from "./authHeader";

const DASH_URL = "http://127.0.0.1:8000/api/boards";

const getDash = () => {
  return axios
    .get(DASH_URL, { headers: authHeader() })
    .then((response) => response.data);
};

const dashService = {
  getDash,
};

export default dashService;
