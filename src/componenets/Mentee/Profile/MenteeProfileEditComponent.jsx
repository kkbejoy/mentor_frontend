import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import SpinnerModal from "../../General/LoadingSpinners/SpinnerModal";
import MenteeProfileImageUploader from "./MenteeProfileImageUploader";
import { updateMenteeProfile } from "../../../api/menteesConfiguration/menteeServices";

const MenteeProfileEditComponent = ({ profile, reRenderFunction }) => {
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const apiResponse = await updateMenteeProfile(values);
      reRenderFunction({ ...apiResponse });
    } catch (error) {
      console.log(error);
    }
  };
  const initialValues = {};
  return (
    <div className="flex flex-col-3 mt-10">
      <div className="mx-auto m">
        {" "}
        <div className="gap-y-6">
          {/* <h3 className="block text-sm text-left font-medium leading-6 text-gray-900">
          Existing Avatar
        </h3> */}
          <img
            src={
              profile.profileImageUrl
                ? `https://res.cloudinary.com/dlcsyyk7z/image/upload/v1696240416/${profile.profileImageUrl}`
                : "https://res.cloudinary.com/dlcsyyk7z/image/upload/v1698830239/mentors/mentor/images_2_d4e6fp_siwirt_a7fcrt.jpg"
            }
            alt="avatar"
            style={{ maxWidth: "200px" }}
            loading="lazy"
            className="my-4 rounded-xl shadow-2xl"
          />
        </div>
        <h1 className="text-2xl font-bold mb-2">
          {profile.firstName + " " + profile.lastName}
        </h1>
        <h1 className="text-lg font-bold mb-5">{profile.email}</h1>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {" "}
        <div>
          <h1 className="text-lg font-semibold">Update Profile</h1>
        </div>
        <Formik
          initialValues={initialValues}
          //   validationSchema={menteeRegistrationValidationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First Name
              </label>
              <div className="mt-2">
                <Field
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder={profile.firstName}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>
            <div>
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
                  autoComplete="off"
                  required
                  placeholder={profile.lastName}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* <div className="mt-7">
                <h1 className="font-semibold">Email:{profile?.email}</h1>
              </div> */}
            </div>

            <div>
              <button
                // onSubmit={handleMenteeProfileUpdate}
                type="submit"
                className="flex w-full justify-center rounded-md bg-mentorBlue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                Submit Changes
              </button>
            </div>
          </Form>
        </Formik>
      </div>
      <MenteeProfileImageUploader
        image={profile?.profileImageUrl}
        reRenderFunction={reRenderFunction}
      />
    </div>
  );
};

export default MenteeProfileEditComponent;
