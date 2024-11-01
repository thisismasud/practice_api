import React from "react";

export default function Form({ children, ...restparams }) {
  return (
    <form action="#" {...restparams}>
      {children}
    </form>
  );
}
