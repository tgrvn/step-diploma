import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGIN, DASHBOARD } from "navigation/CONSTANTS";
import { singup } from "slices/auth";
import { clearMessage } from "slices/message";
import Form from "pages/Auth/Components/Form/Form";

export default function Singup() {
  const form = {
    title: "Зареєструйте свій акаунт",
    inputs: [
      {
        type: "text",
        placeholder: "Укажіть email",
        event: (e) =>
          setInitialValues({ ...initialValues, email: e.target.value }),
      },
      {
        type: "text",
        placeholder: "Укажіть юзернейм",
        event: (e) =>
          setInitialValues({ ...initialValues, username: e.target.value }),
      },
      {
        type: "password",
        placeholder: "Введіть пароль",
        event: (e) =>
          setInitialValues({ ...initialValues, password: e.target.value }),
      },
      {
        type: "password",
        placeholder: "Повторіть пароль",
        event: (e) =>
          setInitialValues({
            ...initialValues,
            password_confirmation: e.target.value,
          }),
      },
    ],
    button: {
      text: "Зареєструватись",
      event: handleSingup,
      styles: { padding: "8px 10px", width: "100%", marginTop: 30 },
    },
    links: [
      {
        to: LOGIN,
        text: "У вас уже є акаунт? Увійдіть",
      },
    ],
    linksStyle: { justifyContent: "center" },
  };

  const [initialValues, setInitialValues] = useState({
    email: null,
    username: null,
    password: null,
    password_confirmation: null,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  useEffect(() => {
    if (isLoggedIn) {
      navigate(DASHBOARD);
    }

    dispatch(clearMessage());
  }, [dispatch, navigate, isLoggedIn]);

  function handleSingup() {
    dispatch(singup(initialValues));

    if (isLoggedIn) {
      navigate(DASHBOARD);
    }
  }

  return (
    <div className="section">
      <Form errors={message} form={form} />
    </div>
  );
}
