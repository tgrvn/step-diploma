import axios from "axios";
import authHeader from "./authHeader";

const GENERATE_URL = "http://127.0.0.1:8000/api/boards/id/url-generate";
const USE_INVITE_URL = "http://127.0.0.1:8000/api/url-add-user/token";

const generateInvite = (id) => {
  const URL = GENERATE_URL.replace("id", id);
  return axios
    .get(URL, { headers: authHeader() })
    .then((response) => response.data);
};

const uzeInviteUrl = (token) => {
  const URL = USE_INVITE_URL.replace("token", token);
  return axios
    .get(URL, { headers: authHeader() })
    .then((response) => response.data);
};

const iniviteService = {
  generateInvite,
  uzeInviteUrl,
};

export default iniviteService;
