import Modal from "react-modal";

import React, { useState } from "react";
import { addNewMentorSkill } from "../../../api/mentorConfiguration/mentorServices";
Modal.setAppElement("#root");

const SkillMoldal = ({ modalOpen, onRequestCloseFunction }) => {
  const [newSkill, setNewSkill] = useState("");
  console.log("value of new skill", newSkill);

  const handleAddNewSkillButton = async (e) => {
    e.preventDefault();
    try {
      const expertise = newSkill.split(",");

      const responseFromApi = await addNewMentorSkill(expertise);
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
        className="w-full max-w-lg h-fit bg-white rounded-lg shadow-lg items-center mx-auto mt-20 p-8 "
      >
        <div className=" p-5 ">
          <h1 className="text-xl text-center  font-bold align-middle">
            Add New Skills
          </h1>
        </div>
        <div className="grid gap-y-5 p-6">
          <label className="text-lg font-semibold" htmlFor="">
            Enter new skills{" "}
            <span className="text-sm font-thin">(Seperate with comma)</span>
          </label>
          <input
            onChange={(e) => setNewSkill(e.target.value)}
            className="shadow-sm w-2/3 items-center rounded-md shadow-black placeholder:px-3 h-16 mx-auto"
            type="text"
          />
          <button
            onClick={handleAddNewSkillButton}
            className="bg-green-500 w-fit mx-auto rounded-md p-3 text-white"
          >
            Add new Skill
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SkillMoldal;
