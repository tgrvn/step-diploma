import React from "react";
import team from "../../../../assets/team.webp";
import board from "../../../../assets/view.svg";
import card from "../../../../assets/card-back.svg";
import styles from "./SectionFeatures.module.scss";

export default function SectionFeatures() {
  return (
    <section className={`section ${styles.features}`}>
      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.content}>
            <h3>Функції, що обіцяють успіх вашій команді</h3>
            <p>
              Щоб підвищити продуктивність команди, потрібно знайти потужний
              інструмент (і немало смаколиків до кави). Від зустрічей і проєктів
              до подій та визначення цілей — інтуїтивно зрозумілі функції Frello
              дають змогу будь-якій команді створити й налаштувати робочі
              процеси для абсолютно різних цілей.
            </p>
          </div>
          <img src={team} alt="" />
        </div>

        <div className={styles.card}>
          <div className={styles.content}>
            <h3>Дошка — це лише початок</h3>
            <p>
              Списки та картки допомагають організувати роботу на дошці Frello.
              Збільшуйте свої можливості через призначення завдань, часові
              шкали, аналітику продуктивності, календарі тощо.
            </p>
          </div>
          <img src={board} alt="" />
        </div>

        <div className={styles.card}>
          <div className={styles.content}>
            <h3>Картки містять все необхідне</h3>
            <p>
              Картки Frello — це ваш портал для більш організованої роботи, де
              кожною частиною завдання можна керувати, відстежувати та ділитися
              з командою. Відкрийте будь-яку картку, щоб поглянути на екосистему
              контрольних списків, дат завершення, вкладень, розмов тощо.
            </p>
          </div>
          <img src={card} alt="" />
        </div>
      </div>
    </section>
  );
}
