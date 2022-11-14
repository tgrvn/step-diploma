import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { singup } from "../../slices/auth";
import Form from "../../components/Form/Form";
import { useNavigate } from "react-router-dom";
import { clearMessage } from "../../slices/message";

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
        to: "/login",
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
      navigate("/dashboard");
    }

    dispatch(clearMessage());
  }, [dispatch, navigate, isLoggedIn]);

  function handleSingup() {
    dispatch(singup(initialValues));

    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }

  return (
    <div className="section">
      <Form errors={message} form={form} />
    </div>
  );
}
