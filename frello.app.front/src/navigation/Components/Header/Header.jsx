import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { LOGIN, SIGNUP, DASHBOARD, WELCOME } from "navigation/CONSTANTS";
import { logout } from "slices/auth";
import { useScrollPosition } from "hooks/useScrollPosition";
import logo from "assets/logo.svg";
import BurgerMenu from "navigation/Components/BurgerMenu/BurgerMenu";
import styles from "./Header.module.scss";

export default function Header() {
  const [scrollY] = useScrollPosition();

  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  let navlinks = [
    <NavLink key={1} to={LOGIN} className={styles.login}>
      увійти
    </NavLink>,
    <NavLink key={2} to={SIGNUP} className={styles.register}>
      зареєструватися
    </NavLink>,
  ];

  function handleLogout() {
    dispatch(logout());
  }

  if (isLoggedIn) {
    navlinks = [
      <button key={1} onClick={handleLogout} className={styles.login}>
        Вийти
      </button>,
    ];
  }

  return (
    <header
      className={
        `${styles.header} ` +
        (scrollY >= 50 ? `${styles["header-scroll"]}` : null)
      }
    >
      <div className={styles.container}>
        <NavLink to={isLoggedIn ? DASHBOARD : WELCOME}>
          <img src={logo} alt="frello" />
        </NavLink>

        <nav className={styles.nav}>
          <BurgerMenu auth={isLoggedIn} />
          {navlinks && navlinks.map((link, i) => link)}
        </nav>
      </div>
    </header>
  );
}
