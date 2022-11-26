import { useEffect } from "react";

export function useAutoResizeTextarea(ref, text) {
  useEffect(() => {
    if (ref?.current) {
      ref.current.style.height = "0";
      const scrollHeight = ref.current.scrollHeight;
      ref.current.style.height = scrollHeight + "px";
    }
  }, [ref, text]);
}
