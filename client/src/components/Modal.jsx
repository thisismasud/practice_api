import { Icon } from "@iconify-icon/react";
import React from "react";
import useClickOutside from "./hooks/useClickOutside";

export default function Modal({
  modalTitle,
  isModalOpen,
  closeModal,
  children,
}) {
  //
  const modalRef = React.useRef(null);

  //hook to close modal on click outside of modal
  useClickOutside(modalRef, closeModal);

  //return null if isModalOpen is false
  if (!isModalOpen) return null;

  return (
    <div className="fixed modal_container mx-auto h-screen w-full bg-gray-700 bg-opacity-65 flex justify-center items-center z-[9999] top-0 left-0">
      <div
        ref={modalRef}
        className="modal lg:w-4/12 w-11/12 shadow-lg rounded-md flex flex-col gap-y-5 lg:p-8 px-3 py-2 focus:outline-none z-50 bg-white"
      >
        <Icon
          icon="ic:outline-close"
          className="cursor-pointer inline-block"
          onClick={closeModal}
          width="1.2rem"
          height="1.2rem"
          style={{ color: "#1a0b3c" }}
        />

        <h2 className="lg:text-3xl text-2xl text-slate-800 font-bold text-center">
          {modalTitle}
        </h2>
        {children}
      </div>
    </div>
  );
}
