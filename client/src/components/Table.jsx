import React from "react";
import imgSrc from "../assets/images/man.jpg";
import Image from "./Image";

export default function Table() {
  return (
    <div className="overflow-x-auto">
      <table className="lg:w-10/12 text-sm mx-auto w-auto text-center">
        <thead className="">
          <tr className="bg-slate-300 font-bold rounded-lg py-3">
            <th className="px-2 py-3">SL</th>
            <th className="px-4 py-3">Avatar</th>
            <th className="px-4 py-3">Username</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Role</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b">
            <td className="px-4 py-3">1</td>
            <td className="px-4 py-3">
              <Image
                imgSrc={imgSrc}
                altImage="man"
                className="w-10 h-10 rounded-full m-auto"
              />
            </td>
            <td className="px-4 py-3">Shakib</td>
            <td className="px-4 py-3">shakib@email.com</td>
            <td className="px-4 py-3">
              <select name="Select_role" id="">
                <option value="User" selected>
                  User
                </option>
                <option value="Admin">Admin</option>
              </select>
            </td>
            <td className="px-4 py-3">
              <a href="#" className="hover:bg-slate-100 p-2 hover:rounded-md">
                <ion-icon name="trash-outline"></ion-icon>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
