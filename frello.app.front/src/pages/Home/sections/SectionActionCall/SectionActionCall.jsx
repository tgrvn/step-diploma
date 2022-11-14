import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/ui/button/Button";
import styles from "./SectionActionCall.module.scss";

export default function SectionActionCall() {
  const navigate = useNavigate();

  return (
    <section className="section">
      <div className={styles.action}>
        <h3>
          Зареєструйтеся й почніть роботу в Frello вже сьогодні. На вас чекає
          світ продуктивної командної роботи!
        </h3>
        <Button
          text={"Зареєструватися"}
          style={{
            color: "#5e6c84",
            backgroundColor: "#ffff",
            margin: "20px 0",
          }}
          event={() => navigate("/signup")}
        />
      </div>
    </section>
  );
}
