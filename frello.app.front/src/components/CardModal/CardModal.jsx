import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useClickOutside } from "../../hooks/useClickOutside";
import Textarea from "../ui/textarea/Textarea";
import Button from "../ui/button/Button";
import EditableTitle from "../ui/editable-title/EditableTitle";
import Checklist from "../Checklist/Checklist";
import {
  card,
  cardMember,
  cardUpdateDescr,
  cardUpdateName,
} from "../../slices/card";
import PopOver from "../PopOver/PopOver";
import MembersMenu from "../MembersMenu/MembersMenu";
import styles from "./CardModal.module.scss";
import Comments from "../Comments/Comments";
import { deleteCard } from "../../slices/board";
import { ColorRing } from "react-loader-spinner";
import ChecklistCreate from "../ChecklistCreate/ChecklistCreate";

export default function CardModal() {
  const dispach = useDispatch();
  const navigate = useNavigate();
  const cardRef = useRef();
  const { cardData, isLoaded } = useSelector((state) => state.card);
  const { boardData } = useSelector((state) => state.board);
  const { cardId, boardId } = useParams();

  const [title, setTitle] = useState(null);
  const [descr, setDescr] = useState(null);

  useClickOutside(cardRef, () => navigate(-1));

  useEffect(() => {
    dispach(card({ boardId, cardId }));
  }, [dispach, boardId, cardId]);

  function handleDrop() {
    dispach(
      deleteCard({
        boardId,
        cardId: cardData?.id,
        columnId: cardData?.column_id,
      })
    );

    navigate(-1);
  }

  function swtichUser(userId) {
    dispach(cardMember({ boardId, cardId, userId }));
  }

  const popOvers = [
    <PopOver
      btnText={"Учасники"}
      content={
        <MembersMenu
          boardMembers={boardData?.members}
          members={cardData?.members}
          excludeEvent={(userId) => swtichUser(userId)}
        />
      }
      btnStyle={{ backgroundColor: "transparent", color: "#172b4d" }}
    />,
    <PopOver
      btnText={"Чек-ліст"}
      content={<ChecklistCreate />}
      btnStyle={{ backgroundColor: "transparent", color: "#172b4d" }}
    />,
    <Button
      text={"Видалити"}
      style={{
        width: "100%",
        backgroundColor: "transparent",
        fontWeight: "300",
        color: "#172b4d",
      }}
      event={handleDrop}
    />,
  ];

  return (
    <div className={styles.modal}>
      <div className={styles.wrapper} ref={cardRef}>
        <div className={styles.head}>
          <span className={styles.close} onClick={() => navigate(-1)}></span>
          <span className={styles.title}>
            <EditableTitle
              defaultValue={cardData?.name}
              onChange={(e) => setTitle(e.target.value)}
              style={{ fontSize: 22, fontWeight: 600, padding: "0 40px 0 0" }}
              state={title}
              submitHandle={() =>
                dispach(
                  cardUpdateName({ boardId, cardId: cardData.id, name: title })
                )
              }
            />
          </span>
        </div>
        <div className={styles.content}>
          <div className={styles.main}>
            <div className={styles.descr}>
              <span className={`md-text ${styles.descrTitle}`}>Опис</span>
              {cardData?.description?.length > 0 ? (
                <EditableTitle
                  defaultValue={cardData?.description}
                  state={descr}
                  onChange={(e) => setDescr(e.target.value)}
                  withButton={true}
                  textClass={"sm-text"}
                  btnText={"Зберегти"}
                  btnStyle={{ marginTop: 12, padding: "6px 12px" }}
                  submitHandle={() =>
                    dispach(
                      cardUpdateDescr({
                        boardId,
                        cardId: cardData.id,
                        name: descr,
                      })
                    )
                  }
                />
              ) : (
                <div>
                  <Textarea
                    state={descr}
                    placeholder={"Введіть описання картки..."}
                    onChange={(e) => setDescr(e.target.value)}
                    className={"sm-text"}
                    style={{ height: "23px", padding: "0" }}
                    text={descr}
                  />
                  {descr?.length > 0 ? (
                    <Button
                      event={() =>
                        dispach(
                          cardUpdateDescr({
                            boardId,
                            cardId: cardData.id,
                            name: descr,
                          })
                        )
                      }
                      text={"Зберегти"}
                      style={{ marginTop: "12px" }}
                    />
                  ) : null}
                </div>
              )}
            </div>
            <div className={styles.chelists}>
              {cardData?.checklists &&
                cardData?.checklists.map((checklist) => (
                  <div className={styles.chelist} key={checklist.id}>
                    <Checklist checklist={checklist} />
                  </div>
                ))}
            </div>

            <Comments comments={cardData?.comments} />
          </div>

          <div className={styles.aside}>
            <ul className={styles.nav}>
              {popOvers &&
                popOvers.map((item, i) => (
                  <li className={styles.navitem} key={i}>
                    {item}
                  </li>
                ))}
            </ul>
          </div>
        </div>
        {isLoaded ? (
          <div className={styles.loadWrappper}>
            <ColorRing
              visible={true}
              height="200px"
              wrapperStyle={{ marginTop: "100px" }}
              width="200px"
              colors={["#0747a6", "#f47e60", "#0065ff", "#fff", "#5e6c84"]}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
