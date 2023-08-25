import { useEffect, RefObject, Dispatch, SetStateAction } from "react";

function useOutsideAlerter(
  ref: RefObject<HTMLElement>,
  set: Dispatch<SetStateAction<boolean>>
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        set(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, set]);
}

export default useOutsideAlerter;
