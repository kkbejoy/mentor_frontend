import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { menteeRegistrationValidationSchema } from "../../../validations/menteeRegisterValidation";
import {
  imageUploadToCloudinary,
  removeAskillFromMentorSkillArray,
  updateMentorProfile,
} from "../../../api/mentorConfiguration/mentorServices";
import { generateUniqueNames } from "../../../utilities/reusableFunctions";
import { useDispatch, useSelector } from "react-redux";
import { fetchMentorProfileData } from "../../../slices/MentorSlices/MentorProfileSlice";
import { UilPlus } from "@iconscout/react-unicons";
import ProfileImageUploader from "./ProfileImageUploader ";
import SkillMoldal from "./SkillMoldal";
const ProfileInformationEditComponent = ({ setRerender, reRenderState }) => {
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [skillModal, setSkillModal] = useState(false);

  const dispatch = useDispatch();
  const mentorProfileDetails = useSelector(
    (state) => state?.mentorProfileDetailsState?.data
  );

  console.log("Mentor Profile Data", mentorProfileDetails);
  const initialValues = {
    // firstName: mentorProfileDetails?.firstName,
    // lastName: " ",
    // email: " ",
    // phoneNumber: " ",
    // password: "",
    // confirmPassword: "",
  };

  // Handle the Image Upload
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
      //Uplloading image to cloudinary
      const uploadResponse = await imageUploadToCloudinary(formData);
      reRenderState({ ...uploadResponse });
      setLoading(false);

      return uploadResponse;
    } catch (error) {
      console.log("Error from uploading image function", error);
      setLoading(false);
      setError(true);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      let imageUploaderResponse;

      //If there is an image it will be uploaded to cloudinary
      if (selectedImage !== "") {
        imageUploaderResponse = await handleImageUpload();
      }
      const skills = values?.skills?.split(",");
      delete values.skills;
      values.expertise = skills;
      const updatedObject = values;
      updatedObject.profileImageUrl = imageUploaderResponse?.public_id;
      const res = await updateMentorProfile(updatedObject);
      setRerender({ ...res });
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };
  const deleteThisSKill = async (e, skill) => {
    try {
      e.preventDefault();
      const res = await removeAskillFromMentorSkillArray(skill);
      setRerender({ ...res });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    dispatch(fetchMentorProfileData());
  }, [reRenderState]);
  return (
    <div className="flex w-auto p-12 ml-10 justify-between mt-10 ">
      {" "}
      <SkillMoldal
        modalOpen={skillModal}
        onRequestCloseFunction={setSkillModal}
        setRerender={setRerender}
        modalOpenAndClose={setSkillModal}
      />
      {/* Skills */}
      <div className="mx-3  ">
        <div className="gap-y-6">
          {/* <h3 className="block text-sm text-left font-medium leading-6 text-gray-900">
          Existing Avatar
        </h3> */}
          <img
            src={
              mentorProfileDetails.profileImageUrl
                ? `https://res.cloudinary.com/dlcsyyk7z/image/upload/v1696240416/${mentorProfileDetails.profileImageUrl}`
                : "https://res.cloudinary.com/dlcsyyk7z/image/upload/v1698830239/mentors/mentor/images_2_d4e6fp_siwirt_a7fcrt.jpg"
            }
            alt="avatar"
            style={{ maxWidth: "200px" }}
            className="my-9 rounded-xl shadow-2xl"
          />
        </div>
        <h1 className="text-2xl font-bold mb-2">
          {mentorProfileDetails.firstName + " " + mentorProfileDetails.lastName}
        </h1>
        <h1 className="text-lg font-bold mb-5">{mentorProfileDetails.email}</h1>
        <h1 className="text-lg font-semibold mb-5">Skills/Expertise</h1>
        <div
          onClick={() => setSkillModal(true)}
          className="flex gap-2 justify-center hover:bg-green-200 rounded-md "
        >
          <h1 className="text-sm"> Add new Skill </h1>
          <UilPlus color="green" />
        </div>
        <div>
          {mentorProfileDetails?.expertise?.map((skills) => {
            return (
              <>
                <div
                  onClick={(e) => deleteThisSKill(e, skills)}
                  className="bg-red-200  w-56   border-spacing-3 my-1 truncate rounded-md shadow-md p-2 cursor-pointer hover:scale-105 transition-transform"
                >
                  <h1>{skills}</h1>
                </div>
              </>
            );
          })}
        </div>

        {/* {skillModal ? (
          <div className="bg-green-300">
            <input
              type="text"
              placeholder="Enter the new skills"
              className="bg-gray-400 w-full rounded-md placeholder:bg-white text-black"
            />
          </div>
        ) : null} */}
      </div>
      {/* //Profile */}
      <div className=" mt-10  mx-auto ">
        <h1 className="text-lg font-semibold mb-5">Profile</h1>
        <Formik
          initialValues={initialValues}
          // validationSchema={menteeRegistrationValidationSchema}
          onSubmit={handleSubmit}
        >
          <Form className=" space-y-6 w-fit ">
            {/* <div className="flex flex-col-2 justify-start gap-8"> */}
            <div className="w-96">
              <label
                htmlFor="firstName"
                className="block w-full text-sm font-medium leading-6 text-gray-900"
              >
                First Name
              </label>

              <div className="mt-2">
                <Field
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="name"
                  placeholder={mentorProfileDetails?.firstName}
                  className="block w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>
            <div className="w-96">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last Name
              </label>
              <div className="mt-2">
                <Field
                  id="lastName"
                  name="lastName"
                  type="text"
                  // placeholder={"hd"}
                  autoComplete="off"
                  className="block w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>
            <div className="flex w-96">
              <h1 className="font-semibold">
                Email: {mentorProfileDetails?.email}
              </h1>{" "}
            </div>
            {/* <div className="flex flex-col-3 justify-start gap-9"> */}
            <div className="w-96">
              <label
                htmlFor="jobTitle"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Current Job Title
              </label>
              <div className="mt-2">
                <Field
                  id="jobTitle"
                  name="jobTitle"
                  type="text"
                  placeholder={mentorProfileDetails?.jobTitle}
                  autoComplete="name"
                  className="block w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <ErrorMessage
                  name="jobTitle"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>
            <div className="w-96">
              <label
                htmlFor="firmName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Current Organisation's Name
              </label>
              <div className="mt-2">
                <Field
                  id="firmName"
                  name="firmName"
                  type="text"
                  placeholder={mentorProfileDetails?.firmName}
                  autoComplete="name"
                  className="block w-96  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <ErrorMessage
                  name="firmName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>
            <div className="w-96">
              <label
                htmlFor="location"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Current Work Location
              </label>
              <div className="mt-2">
                <Field
                  id="location"
                  name="location"
                  type="text"
                  placeholder={mentorProfileDetails?.location}
                  className="block w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* </div> */}
            <div className="w-96">
              <label
                htmlFor="educationalQualification"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Educational Qualification
              </label>
              <div className="mt-2">
                <Field
                  id="educationalQualification"
                  name="educationalQualification"
                  type="text"
                  placeholder={mentorProfileDetails?.educationalQualification}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <ErrorMessage
                  name="educationalQualification"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>
            {/* <div className="flex flex-col-2 justify-start gap-6"> */}
            <div className="w-96">
              <label
                htmlFor="hourlyRate"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Hourly Charges ₹
              </label>
              <div className="mt-2">
                <Field
                  id="hourlyRate"
                  name="hourlyRate"
                  type="number"
                  placeholder={mentorProfileDetails?.hourlyRate}
                  className="w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <ErrorMessage
                  name="hourlyRate"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>
            {/* </div>{" "} */}
            <div className="w-96">
              <label
                htmlFor="website"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Website
              </label>
              <div className="mt-2">
                <Field
                  id="website"
                  name="website"
                  type="url"
                  placeholder={mentorProfileDetails?.website}
                  className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* <div className="flex flex-col-2 justify-start gap-8"> */}
            <div className="w-96">
              <label
                htmlFor="twitterUrl"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                twitter id
              </label>
              <div className="mt-2">
                <Field
                  id="twitterUrl"
                  name="twitterUrl"
                  placeholder={mentorProfileDetails?.twitterUrl}
                  type="text"
                  className="block w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="w-96">
              <label
                htmlFor="linkedInUrl"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                LinkedIn Id
              </label>
              <div className="mt-2">
                <Field
                  id="linkedInUrl"
                  name="linkedInUrl"
                  type="text"
                  placeholder={mentorProfileDetails?.linkedInUrl}
                  className="block w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>{" "}
            {/* </div> */}
            {/* <div className=" flex justify-start w-96  gap-5">
              <h2 className="block text-sm text-left font-medium leading-6 text-gray-900">
                Avatar
              </h2>
              <input
                className="block w-52 border-0 rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setSelectedImage(e.target.files[0]);
                }}
              />
              <div>
                <h3 className="block text-sm text-left font-medium leading-6 text-gray-900">
                  Existing Avatar
                </h3>
                <img
                  src="https://res.cloudinary.com/dlcsyyk7z/image/upload/v1698830622/mentors/mentor/a01fe22f-9c55-40e7-9f99-e516787b7b22-1698755064092_yu4n1u.jpg"
                  alt="avatar"
                  style={{ maxWidth: "200px" }}
                />
              </div>
              {selectedImage && (
                <div>
                  <h3 className="block text-sm text-left font-medium leading-6 text-gray-900">
                    New Avatar (Submit to confirm)
                  </h3>
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected Profile"
                    style={{ maxWidth: "200px" }}
                  />
                </div>
              )}
            </div> */}
            <div className="w-96">
              <label
                htmlFor="bio"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Bio
              </label>
              <div className="mt-2">
                <Field
                  id="bio"
                  name="bio"
                  type="text"
                  placeholder={mentorProfileDetails?.bio}
                  className="block w-full h-36 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <ErrorMessage
                  name="bio"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>
            <div className="w-96">
              <button
                type="submit"
                className="flex w-40 justify-center rounded-md bg-mentorBlue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit Changes{" "}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
      <div className="">
        <h1 className="block text-sm text-left font-medium leading-6 text-gray-900 mb-5">
          Change Avatar
        </h1>

        <ProfileImageUploader
          profileImage={mentorProfileDetails?.profileImageUrl}
          setRerender={setRerender}
        />
      </div>
    </div>
  );
};

export default ProfileInformationEditComponent;
