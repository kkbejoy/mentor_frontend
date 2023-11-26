import React, { useState } from "react";
import { Link } from "react-router-dom";
import { routesFrontend } from "../../../constants/frontendRoutes";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { toast } from "sonner";

const EnterEmailIdComponent = () => {
  const [otpSend, setOtpSend] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initialValuesEmail = {
    email: "",
  };

  const initialValuesPasswrod = {
    otp: "",
    password: "",
    confirmpassword: "",
  };
  const handleSubmitEmail = async () => {
    // e.preventDefault();
    try {
      setEmailVerified(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewPasswordSubmission = async () => {
    try {
      setIsLoading(true);
      toast.success("Successfully entered teh details");
    } catch (error) {
      console.log(error);
      toast.error("Error..!!!");
    }
  };

  return (
    <>
      <div className="w-full sm:w-2/3">
        <section className="w-full min-h-screen h-full">
          <div className="px-8 py-16 flex w-full h-full">
            <div className="m-auto w-full max-w-sm">
              <h1 className="h1 mb-8"></h1>
              <div>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Reset your password
                </h2>
                <p className="mt-1 text-center text-md font-normal leading-9 tracking-tight text-gray-900">
                  Enter your email address and we’ll send you an OTP to your
                  registered Email.
                </p>
                <Formik
                  initialValues={initialValuesEmail}
                  // validationSchema={loginValidationSchema}
                  onSubmit={handleSubmitEmail}
                >
                  <Form>
                    <label
                      htmlFor="id_email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email
                    </label>
                    <div>
                      <Field
                        type="email"
                        name="email"
                        id="id_email"
                        placeholder=" Enter the registered email here"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-light-100 sm:text-sm sm:leading-6"
                        required
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                    <div className="mt-4">
                      {!emailVerified ? (
                        <button
                          type="submit"
                          className="flex w-full justify-center rounded-md bg-mentorBlue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Send OTP
                        </button>
                      ) : null}
                    </div>
                    <p className="text-sm mt-6"></p>
                    {/* </form> */}
                  </Form>
                </Formik>

                {emailVerified ? (
                  <Formik
                    initialValues={initialValuesPasswrod}
                    // validationSchema={loginValidationSchema}
                    onSubmit={handleNewPasswordSubmission}
                  >
                    <Form>
                      <label
                        htmlFor="otp"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Enter the OTP
                      </label>
                      <div>
                        <Field
                          type="otp"
                          name="otp"
                          id="otp"
                          placeholder=" Enter the OTP received on email here"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-light-100 sm:text-sm sm:leading-6"
                          required
                        />
                      </div>
                      <ErrorMessage
                        name="otp"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Enter the new Password
                      </label>
                      <div>
                        <Field
                          type="password"
                          name="password"
                          id="password"
                          placeholder=" Enter the new Password here"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-light-100 sm:text-sm sm:leading-6"
                          required
                        />
                      </div>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                      <label
                        htmlFor="confirmpassword"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Confirm Password
                      </label>
                      <div>
                        <Field
                          type="confirmpassword"
                          name="confirmpassword"
                          id="confirmpassword"
                          placeholder=" Please confirm the password entered"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-light-100 sm:text-sm sm:leading-6"
                          required
                        />
                      </div>
                      <ErrorMessage
                        name="otp"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                      <div className="mt-4">
                        {emailVerified ? (
                          <button
                            disabled={isLoading}
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-mentorBlue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Change Password
                          </button>
                        ) : null}
                      </div>
                      <p className="text-sm mt-6"></p>
                      {/* </form> */}
                    </Form>
                  </Formik>
                ) : null}

                <Link to={routesFrontend.LogIN}>
                  <p className="text-teal-700 font-normal underline">
                    Back to login
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default EnterEmailIdComponent;
