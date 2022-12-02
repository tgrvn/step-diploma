import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBoard } from "slices/board";
import { boards } from "slices/dashboard";
import BoardMenu from "components/BoardMenu/BoardMenu";
import BoardCard from "pages/Dashboard/components/BoardCard/BoardCard";
import CreateBoard from "pages/Dashboard/components/CreateBoard/CreateBoard";
import styles from "./Dashboard.module.scss";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dashboardData } = useSelector((state) => state.dash);
  const [isVisinle, setVisible] = useState(false);

  useEffect(() => {
    dispatch(boards());
  }, [dispatch]);

  return (
    <div className="container section">
      <h5 className="md-text">ВАШІ РОБОЧІ ПРОСТОРИ</h5>
      <div className={styles.cards}>
        {dashboardData?.boards &&
          dashboardData?.boards?.map((board) => (
            <BoardCard
              event={() => navigate(`/board/${board.id}`)}
              key={board.id}
              board={board}
            />
          ))}
        <CreateBoard event={() => setVisible(true)} />
      </div>
      <BoardMenu
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
