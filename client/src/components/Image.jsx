import React from "react";

export default function Image({ imgSrc, altImage, className }) {
  return <img src={imgSrc} alt={altImage} className={className} />;
}
