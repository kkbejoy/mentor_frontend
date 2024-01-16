import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import END_POINTS from "../../../constants/endpoints.js";
import { loginValidationSchema } from "../../../validations/authValidation.js";
import { useDispatch, useSelector } from "react-redux";
// import { useAppSelector } from "../../../hooks/reduxHooks.ts";
import { menteeAsyncLogin } from "../../../slices/menteesAuthSlice.js";
import { mentorAsyncLogin } from "../../../slices/mentorsAuthSlice.js";
import { moderatorAsyncLogin } from "../../../slices/moderatorsAuthSlice.js";
import { routesFrontend } from "../../../constants/frontendRoutes.js";
import GoogleSignin from "../GoogleSignin/GoogleSignin.jsx";
import SpinnerModal from "../LoadingSpinners/SpinnerModal.jsx";
import useLocalStorage from "../../../hooks/useLocalStorage.js";

let LOGIN_URL;
let mentee;
let moderator;

// interface MyFormValues {
//   email: string;
//   password: string;
// }

// interface LoginProps {
//   role: string;
// }

const Login = ({ role, setSuccess, isSuccess }) => {
  const menteeAuthData = useSelector((state) => state.menteeAuth);
  const mentorAuthData = useSelector((state) => state.mentorAuth);
  const moderatorAuthData = useSelector((state) => state.moderatorAuth);

  const [isLoading, setLoading] = useState(false);
  const [menteeAuth, setMenteeAuth] = useLocalStorage("menteeAuth", {});
  const [mentorAuth, setMentorAuth] = useLocalStorage("mentorAuth", {});
  const [moderatorAuth, setModeratorAuth] = useLocalStorage(
    "moderatorAuth",
    {}
  );

  const dispatch = useDispatch();
  switch (role) {
    case "mentees":
      LOGIN_URL = END_POINTS.MENTEE_LOGIN;
      mentee = true;
      // console.log(LOGIN_URL);
      break;
    case "mentors":
      LOGIN_URL = END_POINTS.MENTOR_LOGIN;
      mentee = false;
      // console.log(LOGIN_URL);
      break;
    case "moderators":
      LOGIN_URL = END_POINTS.MODERATOR_LOGIN;
      mentee = false;
      moderator = true;
      // console.log(LOGIN_URL);
      break;
    default:
      LOGIN_URL = END_POINTS.MENTEE_LOGIN;
  }

  const navigate = useNavigate();
  const registerURL = mentee
    ? "/auth/mentee-register"
    : "/auth/mentor-register";

  const forgotpasswordURL = mentee
    ? routesFrontend.MenteeForgotPassword
    : routesFrontend.MentorForgotPassword;

  useEffect(() => {
    console.log("Mentee AUthenericated", menteeAuthData);

    if (menteeAuthData.isMenteeAuthenticated) {
      console.log("Mentee AUthenericated");
      navigate("/mentees");
    }
  }, [menteeAuthData, navigate]);

  useEffect(() => {
    if (mentorAuthData.isMentorAuthenticated) {
      navigate("/mentors");
    }
  }, [mentorAuthData, navigate]);

  useEffect(() => {
    if (moderatorAuthData.isModeratorAuthenticated) {
      navigate("/moderator");
    }
  }, [moderatorAuthData]);

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    console.log("Form entry:", values);
    try {
      setLoading(true);
      //For mentees
      if (role === "mentees") {
        const dispachResponse = dispatch(menteeAsyncLogin(values));
        dispachResponse
          .then((res) => {
            console.log("Res", res);
            if (res?.type === "auth/mentees/fulfilled") {
              const {
                accessToken,
                menteeId,
                menteeName,
                message,
                refreshToken,
                profileImageUrl,
              } = res.payload;
              const menteeAuthData = {
                isMenteeAuthenticated: true,
                accessToken,
                menteeId,
                menteeName,
                message,
                profileImageUrl,
                refreshToken,
              };
              console.log("mentee login Res Data", menteeAuthData);
              setMenteeAuth(menteeAuthData);
              setLoading(false);
              setSuccess(!isSuccess);
              window.location.reload();
            } else if (res?.type === "auth/mentees/rejected") {
              if (
                res?.error.message === "Request failed with status code 401"
              ) {
                setFieldError(
                  "password",
                  "Please verify the entered Email and Password"
                );
                setLoading(false);
              } else if (res?.error.message === "Network Error") {
                setFieldError("password", "Please try again later");
                setLoading(false);
              }
            }
          })
          .catch((error) => {
            console.log("error from catch", error?.error.message);
            setLoading(false);
            // if(error.?error.message)
          });
      }

      //For Mentors

      if (role === "mentors") {
        const dispachResponse = dispatch(mentorAsyncLogin(values));

        dispachResponse
          .then((res) => {
            console.log(res);
            if (res?.type === "auth/mentors/fulfilled") {
              const {
                mentorAccessToken,
                mentorId,
                mentorName,
                message,
                mentorRefreshToken,
              } = res.payload;

              const mentorAuthData = {
                isMentorAuthenticated: true,
                accessToken: mentorAccessToken,
                mentorId,
                mentorName,
                message,
                refreshToken: mentorRefreshToken,
              };
              console.log("Mentor Then");
              setMentorAuth(mentorAuthData); //Local Storage
              setLoading(false);
              setSuccess(!isSuccess);
              window.location.reload();
              // console.log("Is loading", isSuccess);
            }
            if (res?.type === "auth/mentors/rejected") {
              if (
                res?.error.message === "Request failed with status code 409"
              ) {
                setFieldError(
                  "password",
                  "Please verify the entered Email and Password"
                );
                setLoading(false);
              } else if (res?.error.message === "Network Error") {
                setFieldError("password", "Please try again later");
                setLoading(false);
              } // Add conditions for Blocked users and Inactive users
            }
          })
          .catch((error) => {
            console.log("error from catch", error?.error.message);
            setFieldError("password", "Please try again later");
            setLoading(false);
          });
      }
      //For Moderator
      if (role === "moderators") {
        const dispachResponse = dispatch(moderatorAsyncLogin(values));
        dispachResponse
          .then((res) => {
            console.log("Res", res);

            if (res.type === "auth/moderator/fulfilled") {
              const {
                moderatorAccessToken,
                moderatorId,
                message,
                moderatorRefreshToken,
              } = res.payload;
              const moderatorAuthData = {
                isModeratorAuthenticated: true,
                acessToken: moderatorAccessToken,
                moderatorId,
                message,
                refreshToken: moderatorRefreshToken,
              };
              console.log("Moderator", moderatorAuthData);
              setModeratorAuth(moderatorAuthData);
              setSuccess(!isSuccess);
              window.location.reload();
            } else if (res?.type === "auth/moderator/rejected") {
              if (
                res?.error.message === "Request failed with status code 409"
              ) {
                setFieldError(
                  "password",
                  "Please verify the entered Email and Password"
                );
                setLoading(false);
              } else if (res?.error.message === "Network Error") {
                setFieldError("password", "Please try again later");
                setLoading(false);
              }
            } else if (
              res?.error.message === "Request failed with status code 401"
            ) {
              setFieldError("password", "Please try again later");
              setLoading(false);
            }
          })
          .catch((error) => {
            console.log("error from catch", error?.error.message);
            setFieldError("password", "Please try again later");
            setLoading(false);
          });
      }
    } catch (error) {
      console.log(error);
    }
    setSubmitting(false);
  };

  const initialValues = { email: "", password: "" };
  return (
    <>
      <div className="w-full   p-4">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Formik
            initialValues={initialValues}
            validationSchema={loginValidationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="space-y-6" action="#" method="POST">
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
                    autoFocus
                    type="email"
                    autoComplete="email"
                    className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-light-100 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    name="email"
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
                  <div className="text-sm">
                    <Link to={forgotpasswordURL}>
                      <p className="font-normal leading-6 text-indigo-600 hover:text-indigo-500">
                        Forgot password?
                      </p>
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-100 focus:ring-2 focus:ring-inset focus:ring-grey-100 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500"
                  />
                  <div className="flex w-full justify-end py-3">
                    {isLoading && <SpinnerModal />}
                  </div>
                </div>
              </div>

              <div>
                <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Sign in
                </button>
              </div>
            </Form>
          </Formik>
          {mentee && <GoogleSignin />}
          {!moderator && (
            <p className="mt-10 text-center text-sm text-indigo-600 hover:text-indigo-500">
              Not a member?
              <Link to={registerURL}> Sign Up here</Link>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
