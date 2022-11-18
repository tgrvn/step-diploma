import React, { useEffect } from "react";
import { useState } from "react";
import Button from "../ui/button/Button";
import Input from "../ui/input/Input";
import styles from "./MembersMenu.module.scss";

export default function MembersMenu({
  members = "empty",
  boardMembers,
  event,
  excludeEvent,
}) {
  const [memberState, setMemberState] = useState([...boardMembers]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setMemberState([...boardMembers]);

    if (members !== "empty") {
      setMemberState([
        ...memberState.sort(
          (a, b) =>
            members.indexOf(members.find((memb) => b.id === memb.id)) -
            members.indexOf(members.find((memb) => a.id === memb.id))
        ),
      ]);
    }
  }, [setMemberState, boardMembers, members]);

  function setMemberBtn(member) {
    if (members !== "empty") {
      if (
        member.id === user.user.id &&
        members.find((memb) => member.id === memb.id)
      ) {
        return true;
      }

      if (members.find((memb) => member.id === memb.id)) {
        return true;
      }

      if (!members.find((memb) => member.id === memb.id)) {
        return false;
      }

      return false;
    }

    if (member.id === user.user.id) {
      return "you";
    }

    return true;
  }

  function handleSearch(e) {
    const searchValue = e.target.value;

    const result = members.filter((member) => {
      if (!searchValue || member.username.startsWith(searchValue)) {
        return true;
      }

      return false;
    });

    setMemberState(result);
  }

  return (
    <div className={styles.members}>
      <div className={styles.head}>
        <span>Учасники</span>
        <div className="hr" style={{ margin: "10px 0" }}></div>
      </div>
      <Input placeholder={"Пошук учасників"} event={handleSearch} />
      <span className={styles.title}>Учасники дошки</span>
      <ul className={styles.membersList}>
        {memberState &&
          memberState.map((member) => (
            <li onClick={event} className={styles.member} key={member.id}>
              <span className={styles.name}>{member.username}</span>
              <div className={styles.button}>
                {setMemberBtn(member) === "you" ? null : setMemberBtn(
                    member
                  ) ? (
                  <Button
                    event={() => excludeEvent(member.id)}
                    text={"Виключити"}
                    style={{
                      padding: "2px 4px",
                      backgroundColor: "transparent",
                    }}
                  />
                ) : (
                  <Button
                    text={"Додати"}
                    style={{
                      padding: "2px 4px",
                      backgroundColor: "transparent",
                    }}
                    event={() => excludeEvent(member.id)}
                  />
                )}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
