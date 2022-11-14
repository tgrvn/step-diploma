import React, { useState } from "react";
import Button from "../button/Button";
import Textarea from "../textarea/Textarea";

export default function EditArea({
  btnTxt,
  value,
  setValue,
  onChange,
  btnStyle = {},
  textAreaStyle = {},
}) {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div>
      <span></span>
      <Textarea />
      <Button />
    </div>
  );
}
