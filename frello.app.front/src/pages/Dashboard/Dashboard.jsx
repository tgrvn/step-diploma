import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { boards } from "../../slices/dashboard";
import { useAuthChecker } from "../../hooks/useAuthChecker";
import BoardCard from "../../components/BoardCard/BoardCard";
import CreateBoard from "../../components/CreateBoard/CreateBoard";
import CreateMenu from "../../components/ui/create-menu/CreateMenu";
import styles from "./Dashboard.module.scss";
import { createBoard } from "../../slices/board";

export default function Dashboard() {
  useAuthChecker();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dash } = useSelector((state) => state.dash);
  const [isVisinle, setVisible] = useState(false);

  useEffect(() => {
    dispatch(boards());
  }, [dispatch]);

  return (
    <div className="container section">
      <h5 className="md-text">ВАШІ РОБОЧІ ПРОСТОРИ</h5>
      <div className={styles.cards}>
        {dash?.boards &&
          dash?.boards?.map((board) => (
            <BoardCard
              event={() => navigate(`/board/${board.id}`)}
              key={board.id}
              board={board}
            />
          ))}
        <CreateBoard event={() => setVisible(true)} />
      </div>
      <CreateMenu
        visible={isVisinle}
        setVisible={setVisible}
        event={() => setVisible(false)}
        dispachEvent={createBoard}
        refresh={boards}
        style={{
          position: "fixed",
          top: 60.5,
          height: "100vh",
          right: 0,
          zIndex: "998",
          padding: "20px 8px",
        }}
        btnTitle={"Зберегти"}
        head={"Створити"}
      />
      <div className={styles.wrapper}></div>
    </div>
  );
}
