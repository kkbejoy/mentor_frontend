import React, { useState } from "react";
import Modal from "react-modal";
import { UilCheck } from "@iconscout/react-unicons";
export const SuccessModal = ({ isOpen, onRequestClose }) => {
  useState(() => {
    setTimeout((isOpen) => isOpen(false), 5000);
  });
  return (
    <Modal
      isOpen={isOpen}
      className="w-full max-w-lg h-[25vh] bg-white rounded-lg shadow-lg items-center mx-auto mt-5"
      onRequestClose={() => onRequestClose(false)}
    >
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <UilCheck color="Green" />
          </div>
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h1 className="text-green-400 text-lg text-left font-semibold">
              Success...!!!
            </h1>
            <p className="text-sm text-gray-500">
              Succesfully excecuted the opearation..!!!
            </p>
            {/* <p className="text-sm text-gray-500">{errorMessage}</p> */}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SuccessModal;
