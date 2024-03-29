import React, { useState } from "react";
import { generateUniqueNames } from "../../../utilities/reusableFunctions";
import { ErrorModal } from "../../General/Modals/ErrorModal";
import SuccessModal from "../../General/Modals/SuccessModal.jsx";
import {
  imageUploadToCloudinaryFromMenteeSide,
  updateMenteeProfile,
} from "../../../api/menteesConfiguration/menteeServices";

const MenteeProfileImageUploader = ({ image, reRenderFunction }) => {
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
      formData.append("public_id", `mentors/mentee/${uniqueName}`);
      console.log("Form data", formData);
      //Uplloading image to cloudinary
      const uploadResponse = await imageUploadToCloudinaryFromMenteeSide(
        formData
      );
      const updatedObject = {};
      console.log("Updated Response", uploadResponse);
      updatedObject.profileImageUrl = uploadResponse.public_id;
      const apiResponse = await updateMenteeProfile(updatedObject);
      setLoading(false);
      reRenderFunction({ ...apiResponse });
      // setSuccess(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
      // setError(true);
    }
  };

  return (
    <>
      {" "}
      <div className="grid px-5">
        <h1 className="font-semibold">Update Avatar</h1>
        {/* <img
          src={
            image
              ? `https://res.cloudinary.com/dlcsyyk7z/image/upload/v1696240416/${image}`
              : "https://res.cloudinary.com/dlcsyyk7z/image/upload/v1698818859/mentors/mentee/images_2_d4e6fp_siwirt_zyvigw.jpg"
          }
          className="w-32 h-fit"
          alt=""
        /> */}
        {/* <h2 className="font-semibold">Avatar</h2> */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setSelectedImage(e.target.files[0]);
          }}
        />
        {selectedImage && (
          <div>
            <h3>Selected Avatar Preview</h3>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected Profile"
              style={{ maxWidth: "200px" }}
            />
          </div>
        )}
        <div>
          {" "}
          <button
            className="bg-mentorBlue hover:bg-blue-400 text-white font-bold py-2 px-4 mt-4 rounded"
            onClick={handleImageUpload}
          >
            {isLoading ? "Loading" : "Submit New Avatar"}
          </button>
        </div>
      </div>
      <ErrorModal
        isOpen={isError}
        errorMessage={isError}
        onRequestClose={setError}
      />
      <SuccessModal
        isOpen={isSuccess}
        // errorMessage={isError}
        onRequestClose={setSuccess}
      />
    </>
  );
};

export default MenteeProfileImageUploader;
