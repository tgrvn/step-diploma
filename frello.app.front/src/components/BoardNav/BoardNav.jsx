import React from "react";
import { useSelector } from "react-redux";
import CreateMenu from "../BoardMenu/BoardMenu";
import PopOver from "../PopOver/PopOver";
import UrlInvite from "../UrlInviteMenu/UrlInvite";
import Button from "../ui/button/Button";
import MembersMenu from "../MembersMenu/MembersMenu";
import styles from "./BoardNav.module.scss";
import { board, excludeUser, updateBoard } from "../../slices/board";
import boardService from "../../services/board.service";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function BoardNav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { boardData } = useSelector((state) => state.board);
  const { boardId } = useParams();

  function handleDelete() {
    boardService.deleteBoard(boardId);
    navigate("/dashboard");
  }

  function handleExcludeUser(userId) {
    dispatch(excludeUser({ boardId, userId }));
  }

  const popOvers = [
    <PopOver btnText={"Запросити"} content={<UrlInvite />} />,
    <PopOver
      btnText={"Учасники"}
      content={
        <MembersMenu
          boardMembers={boardData?.members}
          excludeEvent={(userId) => handleExcludeUser(userId)}
        />
      }
    />,
    <PopOver
      btnText={"Налаштування"}
      content={
        <CreateMenu
          style={{ padding: 0, backgroundColor: "#fff" }}
          head={"Налаштуванння дошки"}
          btnTitle={"Зберегти"}
          visible={true}
          title={boardData?.name}
          dispachEvent={updateBoard}
          refresh={board}
        />
      }
    />,
  ];

  return (
    <div className={styles.boardNav}>
      <nav className={styles.nav}>
        <h4>{boardData?.name}</h4>
        <ul className={styles.navItems}>
          {popOvers.map((item, i) => (
            <li key={i} className={styles.navLink}>
              {item}
            </li>
          ))}
          <li className={styles.navLink}>
            <Button
              style={{
                backgroundColor: "transparent",
                padding: 0,
                fontWeight: 300,
                fontSize: 16,
                borderRadius: "4px",
              }}
              event={handleDelete}
              text={"Видалити"}
            />
          </li>
        </ul>
      </nav>
    </div>
  );
}
