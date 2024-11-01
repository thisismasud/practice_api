import React from "react";

export default function Input({ inputType, inputName, ...rest }) {
  return (
    <>
      <label htmlFor={inputName}>{inputName}</label>
      <input type={inputType} name={inputName} id={inputName} {...rest} />
    </>
  );
}
