import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Button from "../ui/button/Button";
import Input from "../ui/input/Input";
import styles from "./UrlInvite.module.scss";
import { getInviteUrl } from "../../slices/invite";
import { useParams } from "react-router-dom";

export default function UrlInvite() {
  const dispatch = useDispatch();
  const urlRef = useRef();
  const { inviteUrl } = useSelector((state) => state.url);
  const [copyStatus, setCopyStatus] = useState("Копіювати посилання");
  const [isGenerated, setGenerated] = useState(false);
  const { boardId } = useParams();
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const href = window.location.href;
    const fullUrl = href.substr(0, 22) + "invite/" + inviteUrl;
    setUrl(fullUrl);
  }, [setUrl, inviteUrl, url]);

  function handleCopy(e) {
    urlRef.current.select();
    e.target.focus();
    document.execCommand("copy");
    setCopyStatus("Скопійовано");
    e.target.style.backgroundColor = "#B0BEC5";
    e.target.style.color = "#5e6c84";

    setTimeout(() => {
      e.target.style.backgroundColor = "";
      e.target.style.color = "";
      setCopyStatus("Копіювати посилання");
    }, 2000);
  }

  function handleGenerate() {
    dispatch(getInviteUrl(boardId));
    setGenerated(true);
  }

  return (
    <div className={styles.invite}>
      <div className={styles.head}>
        <span>Запросити до дошки</span>
        <div className="hr" style={{ margin: "10px 0" }}></div>
      </div>
      <div className={styles.url}>
        <span className={styles.title}>
          Сгенеруйте посилання та відправте кориштувачу якого бажаєте додати до
          робочого простору
        </span>
        {isGenerated ? (
          <>
            <Input
              value={inviteUrl}
              Inputref={urlRef}
              status={"readonly"}
              style={{ margin: "10px 0" }}
            />
            <Button
              text={copyStatus}
              style={{ width: "100%" }}
              event={handleCopy}
            />
            <Button
              text={"Сгенерувати ще"}
              style={{ width: "100%", marginTop: "10px" }}
              event={handleGenerate}
            />
          </>
        ) : (
          <Button
            text={"Сгенерувати"}
            style={{ width: "100%", marginTop: "10px" }}
            event={handleGenerate}
          />
        )}
      </div>
    </div>
  );
}
