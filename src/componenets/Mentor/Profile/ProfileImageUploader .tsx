import React, { useState } from "react";
import {
  imageUploadToCloudinary,
  updateMentorProfile,
} from "../../../api/mentorConfiguration/mentorServices";
import { generateUniqueNames } from "../../../utilities/reusableFunctions";
import { ErrorModal } from "../../General/Modals/ErrorModal";
import SuccessModal from "../../General/Modals/SuccessModal";

const ProfileImageUploader = ({ profileImage }) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  // Handle the file selection
  const handleImageUpload = async () => {
    setLoading(true);
    try {
      if (!selectedImage) {
        return;
      }
      const uniqueName = await generateUniqueNames(); //Unique name creator Function
      //Creating Form
      const formData = new FormData();
      formData.append("file", selectedImage);
      formData.append("upload_preset", "mentor");
      formData.append("public_id", `mentors/mentor/${uniqueName}`);
      console.log("Form data", formData);
      //Uplloading image to cloudinary
      const uploadResponse = await imageUploadToCloudinary(formData);
      const updatedObject = {};
      console.log("Updated Response", uploadResponse);
      updatedObject.profileImageUrl = uploadResponse.public_id;
      const apiResponse = await updateMentorProfile(updatedObject);
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };

  return (
    <>
      {" "}
      <div className="gap-y-6">
        {/* <h3 className="block text-sm text-left font-medium leading-6 text-gray-900">
          Existing Avatar
        </h3> */}
        <img
          src={
            profileImage
              ? `https://res.cloudinary.com/dlcsyyk7z/image/upload/v1696240416/${profileImage}`
              : "https://res.cloudinary.com/dlcsyyk7z/image/upload/v1698830239/mentors/mentor/images_2_d4e6fp_siwirt_a7fcrt.jpg"
          }
          alt="avatar"
          style={{ maxWidth: "200px" }}
          className="my-9"
        />
      </div>
      {selectedImage && (
        <div>
          <h3>Selected Image </h3>
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected Profile"
            style={{ maxWidth: "200px" }}
          />
        </div>
      )}
      <div className="grid px-5">
        {/* <h2>Avatar</h2> */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setSelectedImage(e.target.files[0]);
          }}
        />

        <div>
          {" "}
          <button
            className="bg-mentorBlue hover:bg-blue-400 text-white font-bold py-2 px-4 mt-4 rounded"
            onClick={handleImageUpload}
          >
            {isLoading ? "Loading" : "Submit new Avatar"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileImageUploader;
