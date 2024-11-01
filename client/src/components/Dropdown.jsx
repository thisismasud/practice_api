import React from "react";
import useClickOutside from "./hooks/useClickOutside";

export default function Dropdown({ isDropdownOpen, closeDropdown, children }) {
  //ref to modal div
  const dropdownRef = React.useRef(null);

  //hook to open and close
  useClickOutside(dropdownRef, closeDropdown);

  //return null if isDropdownOpen is false
  if (!isDropdownOpen) return null;

  return (
    <div
      ref={dropdownRef}
      id="todo-menu"
      className="absolute flex todo-menu bg-white flex-col text-xs w-24 rounded-sm shadow-lg right-1 mt-4"
    >
      {children}
    </div>
  );
}
