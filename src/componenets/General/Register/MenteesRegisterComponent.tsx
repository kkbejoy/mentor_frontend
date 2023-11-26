import React, { useState } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { menteeRegistrationValidationSchema } from "../../../validations/menteeRegisterValidation";
import { menteeRegistration } from "../../../api/menteesConfiguration/menteeServices";
import { Link, useNavigate } from "react-router-dom";
import RegistrationSucessModal from "../Modals/RegistrationSucessModal";
import SpinnerModal from "../LoadingSpinners/SpinnerModal";
import { messageToFront } from "../../../constants/messageToFront";

const MenteeRegisterComponent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);

  const navigate = useNavigate();
  const initialValues = {
    firstName: " ",
    lastName: " ",
    email: " ",
    phone: "",
    password: "",
    confirmpassword: "",
  };
  const handleSubmit = async (
    values: MyFormValues,
    { setSubmitting, setFieldError }
  ) => {
    console.log("Form entered Details", values, typeof values.phone);
    setIsPageLoading(true);
    await menteeRegistration(values)
      .then((res) => {
        console.log(res);
        if (res?.status === 201) {
          console.log(res.data.message);
          setIsPageLoading(false);
          setIsModalOpen(true);
          setTimeout(() => {
            navigate("/mentees");
          }, 5000);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsPageLoading(false);
        if (error?.code === "ERR_NETWORK") {
          console.log("Network Issue");
          setFieldError(
            "confirmpassword",
            "Network Issue, Please try again later"
          );
        } else if (error?.response.status === 409) {
          setFieldError("confirmpassword", error.response.data.error);
          console.log("user With this emaik id already exists");
        } else if (error.response.status === 403) {
          console.log("User Blocked");
          setFieldError("confirmpassword", error.response.data.error);
        } else if (error.response.status === 400) {
          console.log("internal server issue");
          setFieldError("confirmpassword", error.response.data.error);
        }
      });

    // console.log("res", response);
    setSubmitting(false);
  };

  return (
    <>
      <RegistrationSucessModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        heading={messageToFront.MENTEE_REGISTRATION_SUCCESS_MODAL_HEADING[0]}
        description={
          messageToFront.MENTEE_REGISTRATION_SUCCESS_MODAL_DESCRIPTION[0]
        }
      />

      <div className="w-full   p-4">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign up as a Mentee
            </h2>
            <h4 className="mt-1 text-center text-lg font-thin leading-9 tracking-tight text-gray-900">
              Are you looking to become a
              <Link to={"/auth/mentor-register"}>
                <p className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                  Mentor instead?
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
                    htmlFor="email"
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
                    <div className="flex w-full justify-end py-3">
                      {isPageLoading && <SpinnerModal />}
                    </div>
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

export default MenteeRegisterComponent;
