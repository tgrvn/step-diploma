import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../ui/button/Button";
import ErrorMessage from "../ui/error-message/ErrorMessage";
import Input from "../ui/input/Input";
import styles from "./Form.module.scss";

export default function Form({ form, errors }) {
  const { title, inputs, button, links, linksStyle } = form;

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <h4 className={styles.title}>{title}</h4>
      {errors ? <ErrorMessage messages={errors} /> : null}

      <div className={styles.inputs}>
        {inputs &&
          inputs.map((input, i) => (
            <Input
              key={i}
              type={input.type}
              placeholder={input.placeholder}
              event={input.event}
            />
          ))}
      </div>

      <Button style={button.styles} text={button.text} event={button.event} />

      <span className={`hr ${styles.hr}`}></span>

      <div className={styles.links} style={linksStyle}>
        {links &&
          links.map((link, i) => (
            <NavLink key={i} to={link.to}>
              {link.text}
            </NavLink>
          ))}
      </div>
    </form>
  );
}
