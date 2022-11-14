import { useLayoutEffect, useState } from "react";

export function useScrollPosition() {
  const [scrollPos, setScrollPos] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateScrollPos() {
      setScrollPos([window.scrollY, window.scrollX]);
    }
    window.addEventListener("scroll", updateScrollPos);
    updateScrollPos();
    return () => window.removeEventListener("scroll", updateScrollPos);
  }, []);
  return scrollPos;
}
