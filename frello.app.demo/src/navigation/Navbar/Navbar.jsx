import React from "react";
import styles from "./Navbar.module.scss";
import logo from "assets/logo.svg";

export default function Navbar() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <img
          src={logo}
          alt="frello"
          onClick={() => document.location.reload()}
        />

        <nav className={styles.nav}>
          <a
            className={styles.navItem}
            href="https://github.com/tgrvn/step-diploma/tree/dev"
            target={"_blank"}
          >
            Повний проект на GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
