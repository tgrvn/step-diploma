import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearMessage } from "slices/message";
import { SIGNUP, DASHBOARD } from "navigation/CONSTANTS";
import { login } from "slices/auth";
import Form from "pages/Auth/Components/Form/Form";

export default function Login() {
  const form = {
    title: "Увійти в Trello",
    inputs: [
      {
        type: "text",
        placeholder: "Укажіть email або юзернейм",
        event: (e) =>
          setinItialValues({ ...initialValues, user: e.target.value }),
      },
      {
        type: "password",
        placeholder: "Введіть пароль",
        event: (e) =>
          setinItialValues({ ...initialValues, password: e.target.value }),
      },
    ],
    button: {
      text: "Увійти",
      event: handleLogin,
      styles: { padding: "8px 10px", width: "100%", marginTop: 30 },
    },
    links: [{ to: SIGNUP, text: "Зареєструвати аккаунт" }],
    linksStyle: { justifyContent: "center" },
  };

  const [initialValues, setinItialValues] = useState({
    user: null,
    password: null,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { message } = useSelector((state) => state.message);
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      navigate(DASHBOARD);
    }

    dispatch(clearMessage());
  }, [dispatch, navigate, isLoggedIn]);

  function handleLogin() {
    dispatch(login(initialValues));

    if (isLoggedIn) {
      navigate(DASHBOARD);
    }
  }

  return (
    <div className="section">
      <Form form={form} errors={message} />
    </div>
  );
}
