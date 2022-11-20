import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useClickOutside } from "hooks/useClickOutside";
import Button from "components/ui/button/Button";
import Input from "components/ui/input/Input";
import preview from "assets/preview.svg";
import one from "assets/test/bc_01.jpg";
import two from "assets/test/bc_02.jpg";
import three from "assets/test/bc_03.jpg";
import four from "assets/test/bc_04.jpg";
import styles from "./BoardMenu.module.scss";

const theme = {
  backgrounds: [
    { id: 1, image: one, type: "Background" },
    { id: 2, image: two, type: "Background" },
    { id: 3, image: three, type: "Background" },
    { id: 4, image: four, type: "Background" },
  ],

  colors: [
    { id: 1, color: "#0079BF", type: "Color" },
    { id: 2, color: "#D29034", type: "Color" },
    { id: 3, color: "#519839", type: "Color" },
    { id: 4, color: "#B04632", type: "Color" },
    { id: 5, color: "#89609E", type: "Color" },
  ],
};

export default function BoardMenu({
  head,
  visible,
  setVisible,
  style,
  title,
  dispachEvent,
  refresh,
  btnTitle,
}) {
  const { backgrounds, colors } = theme;
  const { boardId } = useParams();
  const dispatch = useDispatch();
  const menu = useRef();

  useClickOutside(menu, () => {
    if (!!setVisible) {
      setVisible(false);
    }
  });

  const [background, setBackground] = useState({
    theme_type: "Background",
    theme_id: 1,
    background: one,
  });

  const [name, setName] = useState(title || "");

  const setData = ({ background, ...rest }) => rest;

  function handleCreate() {
    const initialValues = setData({
      name: name,
      boardId: boardId,
      ...background,
    });

    dispatch(dispachEvent(initialValues));
    dispatch(refresh(initialValues.boardId));
  }

  function handleKeyDonw({ key }) {
    if (key === "Escape") {
      if (!!setVisible) {
        setVisible(false);
      }
      setName("");
    }

    if (key === "Enter") {
      handleCreate();
    }
  }

  return (
    <>
      {visible ? (
        <div
          ref={menu}
          className={styles.create}
          style={style}
          onKeyDown={handleKeyDonw}
        >
          <div className={styles.head}>
            <span>{head}</span>
            <div className="hr" style={{ margin: "10px 0" }}></div>
          </div>

          <div className={styles.preview}>
            <div
              className={styles.crop}
              style={
                background.theme_type === "Background"
                  ? { backgroundImage: `url("${background.background}")` }
                  : { backgroundColor: `${background.background}` }
              }
            >
              <img src={preview} alt="" />
            </div>
          </div>
          <span className={styles.title}>Фон</span>
          <div className={styles["background-picker"]}>
            <ul className={styles.images}>
              {backgrounds.map((image, i) => (
                <li
                  key={image.id}
                  onClick={(e) =>
                    setBackground({
                      theme_id: image.id,
                      background: image.image,
                      theme_type: "Background",
                    })
                  }
                  style={{ backgroundImage: `url("${image.image}")` }}
                  className={styles.active}
                >
                  <span
                    className={
                      background.theme_id === image.id &&
                      background.theme_type === "Background"
                        ? styles.active
                        : styles["active-hidden"]
                    }
                  >
                    <span className={styles.icon}></span>
                  </span>
                </li>
              ))}
            </ul>
            <ul className={styles.colors}>
              {colors.map((color, i) => (
                <li
                  key={color.id}
                  onClick={(e) =>
                    setBackground({
                      theme_id: color.id,
                      background: color.color,
                      theme_type: "Color",
                    })
                  }
                  style={{ backgroundColor: color.color }}
                >
                  <span
                    className={
                      background.theme_id === color.id &&
                      background.theme_type === "Color"
                        ? styles.active
                        : styles["active-hidden"]
                    }
                  >
                    <span className={styles.icon}></span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <span className={styles.title}>Заголовок дошки</span>
          <Input value={name} event={(e) => setName(e.target.value)} />
          <Button
            event={handleCreate}
            text={btnTitle}
            style={{ marginTop: 26, width: "100%" }}
          />
        </div>
      ) : null}
    </>
  );
}
