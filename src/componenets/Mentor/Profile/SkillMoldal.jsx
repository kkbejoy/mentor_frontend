import Modal from "react-modal";

import React, { useState } from "react";
import { addNewMentorSkill } from "../../../api/mentorConfiguration/mentorServices";
Modal.setAppElement("#root");

const SkillMoldal = ({
  modalOpen,
  onRequestCloseFunction,
  setRerender,
  modalOpenAndClose,
}) => {
  const [newSkill, setNewSkill] = useState("");
  console.log("value of new skill", newSkill);

  const handleAddNewSkillButton = async (e) => {
    e.preventDefault();
    try {
      const expertise = newSkill.split(",");

      const responseFromApi = await addNewMentorSkill(expertise);
      setRerender({ ...responseFromApi });
      modalOpenAndClose(false);
      console.log("Expertise", expertise);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => onRequestCloseFunction(false)}
        // contentLabel="My Modal" // Add a content label for accessibility
        className="w-full  max-w-lg h-fit bg-white rounded-lg shadow-2xl items-center mx-auto mt-36 p-8 "
      >
        <div className=" p-2 ">
          <h1 className="text-xl text-center  font-bold align-middle">
            {/* Add New Skills */}
          </h1>
        </div>
        <div className="grid gap-y-2  text-center w-full">
          <label className="text-xl font-semibold" htmlFor="">
            Enter new skills
            <span className="text-sm font-thin">
              (Seperate skills with comma)
            </span>
          </label>
          <input
            onChange={(e) => setNewSkill(e.target.value)}
            className="border-2 w-2/3 items-center rounded-md shadow-black placeholder:px-0 h-10 mx-auto"
            type="text"
          />
          <button
            onClick={handleAddNewSkillButton}
            className="bg-mentorBlue w-fit mx-auto rounded-md p-3 text-white"
          >
            Submit{" "}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SkillMoldal;
