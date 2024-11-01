import React from "react";

export default function Button({ buttonType, buttonValue, ...rest }) {
  return (
    <button type={buttonType} className="mt-6 btn" {...rest}>
      {buttonValue}
    </button>
  );
}
