import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/ui/button/Button";
import frello_01 from "../../../../assets/frello_1_uk-UA.webp";
import styles from "./SectionPreview.module.scss";

export default function SectionPreview() {
  const navigate = useNavigate();

  return (
    <section className={`section ${styles.preview}`}>
      <span className="hr"></span>
      <div className={styles.content}>
        <h3>Це більше, ніж робота. Це спосіб ефективної співпраці.</h3>
        <p>
          Почніть роботу з дошками, списками й картками Frello. Налаштовуйте
          програму й розширюйте можливості за допомогою додаткових функцій
          відповідно до темпів розвитку вашої команди. Керуйте проєктами, стежте
          за виконанням завдань і формуйте командний дух — на єдиному ресурсі.
        </p>
        <Button
          text={"Почати роботи"}
          style={{ marginTop: 30, marginBottom: 60 }}
          event={() => navigate("/signup")}
        />
        <img src={frello_01} alt="" />
      </div>
      <span className="hr"></span>
    </section>
  );
}
