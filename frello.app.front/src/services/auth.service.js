import axios from "axios";

const REG_URL = "http://127.0.0.1:8000/api/register";
const LOG_URL = "http://127.0.0.1:8000/api/login";

const singup = (email, username, password, password_confirmation) => {
  return axios
    .post(REG_URL, {
      email,
      username,
      password,
      password_confirmation,
    })
    .then((response) => {
      if (response.data.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
      }

      return response.data;
    });
};

const login = (user, password) => {
  return axios
    .post(LOG_URL, {
      user,
      password,
    })
    .then((response) => {
      if (response.data.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  singup,
  login,
  logout,
};

export default authService;
