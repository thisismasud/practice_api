import React from "react";

export default function Header({ logoName }) {
  return (
    <header>
      <div className="text-3xl text-blue-950 font-bold mb-10 md:mb-0 lg:text-4xl">
        {logoName}
      </div>
    </header>
  );
}
