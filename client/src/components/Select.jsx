import React from "react";

export default function Select({ selectName, children, value, ...rest }) {
  return (
    <>
      <label htmlFor={selectName}>{selectName}</label>
      <select
        className="select"
        name={selectName}
        id={selectName}
        value={value}
        {...rest}
      >
        {children}
      </select>
    </>
  );
}
