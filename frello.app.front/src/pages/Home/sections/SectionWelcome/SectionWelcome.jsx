import React from "react";
import { useNavigate } from "react-router-dom";
import hero from "../../../../assets/hero.webp";
import Button from "../../../../components/ui/button/Button";
import styles from "./SectionWelcome.module.scss";

export default function SectionWelcome() {
  const navigate = useNavigate();

  return (
    <section className={`section ${styles.welcome}`}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.left}>
            <h2>Frello допомагає командам оптимізувати роботу.</h2>
            <p>
              Співпрацюйте, керуйте проєктами й досягайте нових вершин
              продуктивності. Де б ви не працювали — в офісному центрі чи вдома
              — за допомогою Frello вашій команді вдасться все.
            </p>
            <Button
              text={"Реєструйся - це безкоштовно!"}
              style={{ marginTop: 50 }}
              event={() => navigate("/signup")}
            />
          </div>

          <div className={styles.right}>
            <img src={hero} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
