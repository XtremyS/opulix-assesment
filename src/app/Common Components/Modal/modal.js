import Image from "next/image";
import React from "react";

const Modal = ({ modalTitle, IsOpen, CloseModal, children }) => {
  const ModalClass = IsOpen
    ? "fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out opacity-100"
    : "fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out opacity-0 pointer-events-none";

  return (
    <div className={ModalClass} onClick={CloseModal}>
      <div className="modal-overlay absolute inset-0 bg-gray-900 opacity-50"></div>
      <div
        className="modal-container bg-white w-11/12  min-[1300px]:w-fit mx-auto rounded-lg shadow-lg z-50 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center px-5 py-4">
          <h1 className="text-xl md:text-2xl font-bold">{modalTitle}</h1>
          <button
            onClick={CloseModal}
            className="modal-close text-gray-500 hover:text-gray-700 hover:bg-[#efeeee] rounded-full transition-all duration-[0.3s]"
          >
            <Image
              src={"/icons/Modal icons/close_icon.svg"}
              width={38}
              height={38}
              alt="Close icon"
            ></Image>
          </button>
        </div>
        <div className="modal-content py-4 text-left px-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
