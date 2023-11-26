import React, { useState } from "react";
import Modal from "react-modal";
import HorizontalDivider from "../../../General/HorizontalDivider/HorizontalDivider";
import { UilExclamationTriangle } from "@iconscout/react-unicons";
const ConfirmModal = ({
  modalState,
  modalStateControlFunction,
  onConfirmExcecutableFunction,
  message,
  loadingState,
  loadingFunction,
}) => {
  const [isLoading, setLoading] = useState(false);

  return (
    <Modal
      isOpen={modalState}
      onRequestClose={() => modalStateControlFunction(false)}
      contentLabel="My Modal" // Add a content label for accessibility
      className="flex w-fit max-w-3xl h-fit bg-white rounded-lg p-10 shadow-lg items-center mx-auto mt-52 "
    >
      {" "}
      <UilExclamationTriangle color="red" size="50px" />
      <div className="pl-4">
        <div className=" ">
          <h1 className="text-xl text-left font-semibold ">
            Confirmation Required
          </h1>
        </div>
        <>
          <div>
            <h1 className="block text-lg font-normal leading-6 pt-5 text-gray-900 ">
              {message}
            </h1>{" "}
            <div className="mt-2"></div>
          </div>

          <button
            disabled={loadingState}
            type="submit"
            onClick={onConfirmExcecutableFunction}
            className="flex text-right justify-end mt-3 rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {loadingState ? "Loading......." : "Block this User"}
          </button>
        </>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
