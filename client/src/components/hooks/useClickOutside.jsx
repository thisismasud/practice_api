import { useEffect } from "react";

const useClickOutside = (ref, onClickOutside) => {
  useEffect(() => {
    const handleClickOutside = (e) => {
      //check if the click is outside the ref element
      if (ref.current && !ref.current.contains(e.target)) {
        onClickOutside();
      }
    };
    //bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    //cleanup event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClickOutside]);
};
export default useClickOutside;
