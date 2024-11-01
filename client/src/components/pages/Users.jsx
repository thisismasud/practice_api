import { Icon } from "@iconify-icon/react";
import React from "react";
import ReactDataTable from "../ReactDataTable";

export default function Users() {
  return (
    <div className="md:flex flex-col justify-start container mx-auto lg:gap-5 h-screen lg:p-8 p-5">
      <div>
        <a
          href="dashboard.html"
          className="mt-3 p-2 text-sm hover:text-slate-500"
        >
          <Icon
            icon="material-symbols:arrow-back"
            width="1rem"
            height="1rem"
            style={{ color: "#1a0b3c" }}
          />{" "}
          Back to dashboard
        </a>
        <h1 className="mx-auto text-center py-5">Users</h1>
        <ReactDataTable />
      </div>
    </div>
  );
}
