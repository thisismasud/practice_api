import React from "react";

export default function ListItem({ children, ...rest }) {
  return <li {...rest}>{children}</li>;
}
