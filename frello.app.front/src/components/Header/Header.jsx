import React from "react";
import { NavLink } from "react-router-dom";
import BurgerMenu from "../ui/burger-menu/BurgerMenu";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import logo from "../../assets/logo.svg";
import styles from "./Header.module.scss";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/auth";

export default function Header({ auth }) {
  const [scrollY] = useScrollPosition();
  const dispatch = useDispatch();

  let navlinks = [
    <NavLink key={1} to={"/login"} className={styles.login}>
      увійти
    </NavLink>,
    <NavLink key={2} to={"/signup"} className={styles.register}>
      зареєструватися
    </NavLink>,
  ];

  function handleLogout() {
    dispatch(logout());
  }

  if (auth) {
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
        <NavLink to={auth ? "/dashboard" : "/welcome"}>
          <img src={logo} alt="frello" />
        </NavLink>

        <nav className={styles.nav}>
          <BurgerMenu auth={auth} links={navlinks} />
          {navlinks && navlinks.map((link, i) => link)}
        </nav>
      </div>
    </header>
  );
}
