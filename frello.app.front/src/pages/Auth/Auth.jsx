import React, { useEffect } from "react";
import styles from "./Auth.module.scss";
import left from "../../assets/frello-bc-01.svg";
import right from "../../assets/frello-bc-02.svg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Auth({ child }) {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [navigate, isLoggedIn]);

  return (
    <>
      <div className={styles.background}>
        <img src={left} alt="" />
        <img src={right} alt="" />
      </div>
      {child}
    </>
  );
}
