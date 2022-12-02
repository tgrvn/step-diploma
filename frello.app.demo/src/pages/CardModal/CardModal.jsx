import React, { useState, useRef, useEffect } from "react";
import { useClickOutside } from "hooks/useClickOutside";
import Textarea from "components/ui/textarea/Textarea";
import Button from "components/ui/button/Button";
import EditableTitle from "components/ui/editable-title/EditableTitle";
import Checklist from "pages/CardModal/components/Checklist/Checklist";
import PopOver from "components/PopOver/PopOver";
import styles from "./CardModal.module.scss";
import Comments from "./components/Comments/Comments";
import ChecklistCreate from "components/ChecklistCreate/ChecklistCreate";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { dropCard, setCardData, updateCardData } from "redux/slices/boardSlice";

export default function CardModal() {
  const cardRef = useRef();
  const dispatch = useDispatch();
  const { cardData } = useSelector((state) => state.board);
  const { cardId, columnId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setCardData({ cardId, columnId }));
  }, [dispatch, cardId, columnId]);

  const [title, setTitle] = useState(null);
  const [descr, setDescr] = useState(null);

  useClickOutside(cardRef, () => navigate(-1));

  function handleUpdateData() {
    dispatch(updateCardData({ cardId, columnId, name: title, descr }));
  }

  function handleDrop() {
    dispatch(dropCard({ cardId, columnId }));
    navigate(-1);
  }

  const popOvers = [
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
              submitHandle={handleUpdateData}
            />
          </span>
        </div>
        <div className={styles.content}>
          <div className={styles.main}>
            <div className={styles.descr}>
              <span className={`md-text ${styles.descrTitle}`}>Опис</span>
              {cardData && cardData?.description?.length > 0 ? (
                <EditableTitle
                  defaultValue={cardData?.description}
                  state={descr}
                  onChange={(e) => setDescr(e.target.value)}
                  withButton={true}
                  textClass={"sm-text"}
                  btnText={"Зберегти"}
                  btnStyle={{ marginTop: 12, padding: "6px 12px" }}
                  submitHandle={handleUpdateData}
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
                      event={handleUpdateData}
                      text={"Зберегти"}
                      style={{ marginTop: "12px", padding: "6px 12px" }}
                    />
                  ) : null}
                </div>
              )}
            </div>
            <div className={styles.chelists}>
              {cardData?.checklists
                ? cardData?.checklists.map((checklist) => (
                    <div className={styles.chelist} key={checklist.id}>
                      <Checklist checklist={checklist} />
                    </div>
                  ))
                : null}
            </div>
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
      </div>
    </div>
  );
}
