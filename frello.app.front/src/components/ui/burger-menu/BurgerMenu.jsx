import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useWindowSize } from "../../../hooks/useWindowSize";
import { logout } from "../../../slices/auth";
import styles from "./BurgerMenu.module.scss";

function BurgerMenu({ auth }) {
  const dispatch = useDispatch();
  const [width] = useWindowSize();
  const [showMenu, setShowMenu] = useState(false);

  function handleLogout() {
    dispatch(logout());
  }

  let navlinks = [
    <NavLink key={1} to={"/login"} className={styles.login}>
      увійти
    </NavLink>,
    <NavLink key={2} to={"/signup"} className={styles.register}>
      зареєструватися
    </NavLink>,
  ];

  if (auth) {
    navlinks = [
      <button key={1} onClick={handleLogout} className={styles.login}>
        Вийти
      </button>,
    ];
  }

  return (
    <div className={width < 700 ? styles.burger : styles.hidden}>
      <button
        className={styles.btn}
        onClick={() => (showMenu ? setShowMenu(false) : setShowMenu(true))}
      >
        <div className={showMenu ? styles["icon-active"] : styles.icon}>
          <span className={styles.hr}></span>
        </div>
      </button>

      <div className={showMenu ? styles.menu : styles["menu-hidden"]}>
        {navlinks && navlinks.map((link) => link)}
      </div>
    </div>
  );
}

export default BurgerMenu;
