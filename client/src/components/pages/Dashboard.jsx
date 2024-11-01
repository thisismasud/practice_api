import { Icon } from "@iconify-icon/react";
import React, { useState } from "react";
import avatarImg from "../../assets/images/man.jpg";
import Button from "../Button";
import Dropdown from "../Dropdown";
import Input from "../Input";
import ListItem from "../ListItem";
import Modal from "../Modal";
import Form from "./../Form";
import Image from "./../Image";
import Select from "./../Select";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  //open and close modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  //open and close dropdown
  const openDropdown = () => setIsDropdownOpen(true);
  const closeDropdown = () => setIsDropdownOpen(false);

  //open and close sidebar
  const handleSidebar = (e) => {
    console.log(e.target);
    setIsSidebarOpen(!isSidebarOpen);
  };
  console.log(isSidebarOpen);
  return (
    <>
      <div className="container mx-auto h-screen">
        <div className="lg:flex flex-row lg:h-screen h-screen">
          {/* sidebar */}
          <div
            className={`absolute lg:static lg:left-0 sidebar p-5 lg:flex lg:h-auto flex-col gap-5 lg:w-3/12 w-full h-screen bg-slate-50 z-10 text-sm ${
              isSidebarOpen ? "flex" : "hidden"
            }`}
          >
            <div className="logo text-2xl font-bold md:mb-0 lg:text-4xl pb:3">
              Discipline
            </div>
            <Button buttonValue="Create a new task" onClick={openModal} />

            <ul>
              <ListItem className="p-3 mb-5 text-2xl font-bold border-b-2 border-gray-300">
                Categories
              </ListItem>
              <ListItem className="pl-5 p-2 rounded-lg active cursor-pointer flex items-center">
                <Icon
                  icon="ri:time-line"
                  width="1.2rem"
                  height="1.2rem"
                  className="pr-2"
                  style={{ color: "#1a0b3c" }}
                />
                Urgent
              </ListItem>
              <ListItem className="pl-5 p-2 rounded-lg cursor-pointer flex items-center">
                <Icon
                  icon="subway:time-5"
                  width="1rem"
                  height="1rem"
                  className="pr-2"
                  style={{ color: "#1a0b3c" }}
                />
                Normal
              </ListItem>

              <ListItem className="pl-5 p-2 rounded-lg cursor-pointer flex items-center">
                <Icon
                  icon="simple-icons:ticktick"
                  width="1rem"
                  height="1rem"
                  className="pr-2"
                  style={{ color: "#1a0b3c" }}
                />
                Completed
              </ListItem>
            </ul>
            <Form>
              <a
                href="users.html"
                className="w-full bg-slate-200 p-3 pl-5 block font-bold rounded-full text-cyan-950"
              >
                View Users
              </a>
            </Form>

            <div className="logout flex flex-row justify-center items-center align-middle gap-2 h-auto mt-10 cursor-pointer">
              <Image imgSrc={avatarImg} className="w-10 h-10 rounded-full" />
              <span className="text-lg font-bold">Masud</span>
              <Icon
                icon="ic:outline-logout"
                width="1.6rem"
                height="1.6rem"
                style={{ color: "#1a0b3c" }}
              />
            </div>
          </div>
          {/* sidebar ends */}

          {/* hamburger menu */}
          <div className="hamburger-menu p-5 flex absolute right-3 z-10 cursor-pointer lg:hidden">
            <Icon
              icon="quill:hamburger-sidebar"
              width="1.8rem"
              height="1.8rem"
              style={{ color: "#1a0b3c" }}
              onClick={handleSidebar}
            />
          </div>
          {/* hamburger menu ends */}

          {/* main content */}
          <div className="text-red lg:w-9/12 h-auto lg:px-12 px-3">
            {/* Main content header */}
            <header className="lg:border-b-2 border-gray-300 lg:p-8 lg:pt-4 p-2 pt-16 lg:flex lg:flex-row lg:justify-between lg:items-center">
              <div className="lg:w-4/12 lg:pb-0 pb-3 block text-2xl font-bold lg:text-left text-center">
                <ListItem className="list-none">Urgent</ListItem>
              </div>
              <Form className="lg:w-4/12 text-lg lg:text-right lg:pb-0 pb-5">
                <Input inputType="text" placeholder="Search Todo" />
              </Form>
              <Form className="lg:w-3/12">
                <Input
                  inputType="date"
                  id="myDate"
                  name="myDate"
                  min="2023-01-01"
                  max="2024-12-31"
                  className="p-2 text-slate-400 border rounded"
                />
              </Form>
            </header>
            {/* Main content header ends */}

            {/* todo section */}
            <section className="todoSection lg:p-4 pt-4 lg:pt-8 flex flex-row lg:gap-3 pb-3">
              {/* todo */}
              <div className="todo lg:w-3/12 md:w-4/12 w-full h-auto text-md rounded-xl lg:p-3 p-3">
                <Icon
                  icon="ri:todo-line"
                  width="1rem"
                  height="1rem"
                  className="pr-2"
                  style={{ color: "#1a0b3c" }}
                />
                <span className="title overflow-hidden">
                  Create javascript Cheatsheet.
                </span>
                <span className="description text-sm block text-slate-400">
                  Use Proper Documenations.
                </span>
                <span className="relative flex flex-row justify-between pt-3">
                  <span className="date text-sm font-thin text-slate-400">
                    27 Oct, 2024
                  </span>

                  <Icon
                    icon="mi:options-horizontal"
                    className="cursor-pointer"
                    width="1rem"
                    height="1rem"
                    style={{ color: "#1a0b3c" }}
                    onClick={openDropdown}
                  />
                  {/* todo menu open on click of 3 dots default- hidden */}
                  <Dropdown
                    closeDropdown={closeDropdown}
                    isDropdownOpen={isDropdownOpen}
                  >
                    <a
                      href="#"
                      className="hover:bg-slate-100 pl-2 py-1 rounded-t-sm"
                    >
                      <Icon
                        icon="lucide:edit"
                        width="0.7rem"
                        height="0.7rem"
                        style={{ color: "#1a0b3c" }}
                      />{" "}
                      Edit
                    </a>
                    <a
                      href="#"
                      className="hover:bg-slate-100 pl-2 py-1 rounded-b-sm"
                    >
                      <Icon
                        icon="mi:delete"
                        width="0.7rem"
                        height="0.7rem"
                        style={{ color: "#1a0b3c" }}
                      />{" "}
                      Delete
                    </a>
                  </Dropdown>
                </span>
              </div>

              {/* todo ends */}
            </section>

            {/* todo section ends */}
          </div>
          {/* main content ends */}
        </div>
      </div>

      {/* modal */}
      <Modal
        modalTitle="Create a new task"
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      >
        <Form>
          <Input inputType="text" inputName="Title" />
          <Input inputType="text" inputName="Description" />
          <Input inputType="date" inputName="Task_Complete_Date" />
          <Select
            selectName="Category"
            className="text-slate-800 mt-2 py-3 pl-3 border-gray-400 rounded-md border-2 w-full"
          >
            <option>Urgent</option>
            <option>Normal</option>
          </Select>
          <Button buttonType="submit" buttonValue="Save" />
        </Form>
      </Modal>
    </>
  );
}
