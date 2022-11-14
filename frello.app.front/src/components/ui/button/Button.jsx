import styles from "./Button.module.scss";

function Button({ text, style, event }) {
  return (
    <button style={style} onClick={event} className={styles.btn}>
      {text}
    </button>
  );
}

export default Button;
