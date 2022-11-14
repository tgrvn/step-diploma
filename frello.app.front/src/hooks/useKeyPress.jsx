import { useEffect, useState } from "react";

export function useKeyPress(targetKey, handle) {
  //   const [keyPressed, setKeyPressed] = useState(false);

  //   const downHandler = ({ key }) => {
  //     if (key === targetKey) setKeyPressed(true);
  //     handle();
  //   };

  //   const upHandler = ({ key }) => {
  //     if (key === targetKey) setKeyPressed(false);
  //   };

  const listener = (event) => {
    if (event.key !== targetKey) {
      return;
    }
    handle(event);
  };

  useEffect(() => {
    window.addEventListener("keydown", listener);
    // window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", listener);
      //   window.removeEventListener("keyup", upHandler);
    };
  }, []);

  //   return keyPressed;
}
