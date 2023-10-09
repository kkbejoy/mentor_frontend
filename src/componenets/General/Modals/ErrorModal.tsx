import React, { useState } from "react";
import Modal from "react-modal";
import { UilExclamationTriangle } from "@iconscout/react-unicons";

export const ErrorModal = ({ isOpen, onRequestClose, errorMessage }) => {
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
            <UilExclamationTriangle color="red" />
          </div>
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h1 className="text-red-400 text-lg text-left font-semibold">
              Error...!!!
            </h1>
            <p className="text-sm text-gray-500">
              Something went Wrong..! Please try Again
            </p>
            <p className="text-sm text-gray-500">{errorMessage}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

// export default ErrorModal;
