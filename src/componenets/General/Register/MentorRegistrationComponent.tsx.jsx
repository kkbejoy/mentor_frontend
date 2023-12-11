//Just  a copied version
import React, { useState } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { menteeRegistrationValidationSchema } from "../../../validations/menteeRegisterValidation";
import { mentorRegistration } from "../../../api/mentorConfiguration/mentorServices";
import SpinnerModal from "../LoadingSpinners/SpinnerModal";
import RegistrationSucessModal from "../Modals/RegistrationSucessModal";
import { messageToFront } from "../../../constants/messageToFront";
import { Link, useNavigate } from "react-router-dom";
export const MentorRegisterComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    firstName: " ",
    lastName: " ",
    email: " ",
    phoneNumber: " ",
    password: "",
    confirmPassword: "",
  };
  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    setIsPageLoading(true);
    console.log("Form entered Details", values);
    const skills = values.skills.split(",");
    console.log(skills);
    delete values.skills;
    values.expertise = skills;
    console.log("Form entered Details", values);

    await mentorRegistration(values)
      .then((res) => {
        console.log("Mentor Registration success", res);
        // setIsPageLoading(false);
        setIsModalOpen(true);

        setTimeout(() => {
          navigate("/");
        }, 4000);
      })
      .catch((error) => {
        console.log("Error From Mentor reg error", error.response);
        if (error?.response.status === 403 && error?.response.data?.blocked) {
          console.log(1);
          setFieldError("confirmpassword", error?.response.data.error);
          setIsPageLoading(false);
        } else if (error?.response.status === 403) {
          console.log("Previous application undergoing review");
          setIsModalOpen(true);
          setIsPageLoading(false);
          setTimeout(() => {
            navigate("/");
          }, 4000);
        } else if (error?.response.status === 409) {
          console.log(3);
          setFieldError("confirmpassword", error?.response.data.error);
          setIsPageLoading(false);
          setTimeout(() => {
            navigate("/auth/login");
          }, 4000);
        } else {
          console.log("SOmething went wriog");
          setFieldError(
            "confirmpassword",
            "Something went wrong..!! Please try Again"
          );
        }
      });
    setSubmitting(false);
  };

  return (
    <>
      <RegistrationSucessModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        heading={messageToFront.MENTOR_REGISTRATION_SUCCESS_MODAL_HEADING[0]}
        description={
          messageToFront.MENTOR_REGISTRATION_SUCCESS_MODAL_DESCRIPTION[0]
        }
      />
      <div className="w-full   p-4">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign up as a Mentor
            </h2>
            <h4 className="mt-1 text-center text-lg font-thin leading-9 tracking-tight text-gray-900">
              Are you looking to become a{" "}
              <Link to={"/auth/mentee-register"}>
                {" "}
                <p className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                  {" "}
                  Mentee instead?{" "}
                </p>
              </Link>
            </h4>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <Formik
              initialValues={initialValues}
              validationSchema={menteeRegistrationValidationSchema}
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
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Phone Number
                  </label>
                  <div className="mt-2">
                    <Field
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div>
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
                      autoComplete="name"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="jobTitle"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div>
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
                      autoComplete="name"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="firmName"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div>
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
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
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
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="bio"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div>
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
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="educationalQualification"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div>
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
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="hourlyRate"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="expertise"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Expertise/Skills
                  </label>
                  <div className="mt-2">
                    <Field
                      id="skills"
                      name="skills"
                      type="text"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="skills"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div>
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
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
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
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
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
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="confirmpassword"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Confirm Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <Field
                      id="confirmpassword"
                      name="confirmpassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="confirmpassword"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="flex w-full justify-end py-3">
                    {isPageLoading && <SpinnerModal />}
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-mentorBlue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign up
                  </button>
                </div>
              </Form>
            </Formik>
            {/* <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Start a 14 day free trial
            </a>
          </p> */}
          </div>
        </div>
      </div>
    </>
  );
};

// export default MentorRegisterComponent;
