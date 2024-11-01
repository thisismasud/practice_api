import { Icon } from "@iconify-icon/react";
import React from "react";
import DataTable from "react-data-table-component";
import imgSrc from "../assets/images/man.jpg";
import { customStyles } from "../styles/dataTableStyles";
import Image from "./Image";
import Select from "./Select";

const columns = [
  {
    name: "Sl",
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: "Avatar",
    cell: (row) => (
      <Image
        imgSrc={row.avatar.imgSrc}
        altImage="avatar"
        className="w-10 h-10 rounded-full"
      />
    ),
  },
  {
    name: "Username",
    selector: (row) => row.username,
  },
  {
    name: "Email",
    selector: (row) => row.email,
  },
  {
    name: "Role",
    cell: (row) => (
      <Select value={row.role} onChange={handleRoleChange}>
        <option value="User">User</option>
        <option value="Admin">Admin</option>
      </Select>
    ),
  },
  {
    name: "Action",
    cell: () => (
      <Icon
        icon="material-symbols:delete-outline"
        width="1rem"
        height="1rem"
        className="cursor-pointer"
        style={{ color: "#1a0b3c" }}
        onClick={() => {
          confirm("Are you sure you want to delete this item?");
        }}
      />
    ),
  },
];
const data = [
  {
    id: 1,
    avatar: { imgSrc },
    username: "Masud",
    email: "masud@email.com",
    role: "Admin",
  },
  {
    id: 2,
    avatar: { imgSrc },
    username: "Sakib",
    email: "sakib@email.com",
    role: "Admin",
  },
];

const handleRoleChange = (e) => {
  console.log(e.target.value);
};

export default function ReactDataTable() {
  return (
    <DataTable
      columns={columns}
      data={data}
      pagination
      paginationPerPage={50} //sets default pagination for 50 rows in a page
      paginationRowsPerPageOptions={[10, 30, 50, 100]}
      dense
      responsive
      highlightOnHover
      striped
      customStyles={customStyles}
    />
  );
}
