import React, { useState } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");
const ConfirmationModal = ({
  isOpen,
  setModalOpen,
  confirmAPI,
  onCancel,
  message,
}) => {
  // const [isModalOpen, setModalOpen] = useState(false);

  const handleConfirm = () => {
    // Handle confirmation 0
    confirmAPI();
    setModalOpen(false);
  };

  const handleCancel = () => {
    // Handle cancel logic
    setModalOpen(false);
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Confirmation Modal"
        className="w-full max-w-lg h-[25vh] bg-white rounded-lg shadow-lg  mx-auto " // Define your custom modal styles here
        overlayClassName="bg-gray-50" // Define your custom overlay styles here
      >
        <div>
          <h2>Are you sure you want to proceed?</h2>
          <button onClick={handleConfirm}>Confirm</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
};

export default ConfirmationModal;
