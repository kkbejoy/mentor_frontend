import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import END_POINTS from "../../../constants/endpoints.ts";
import { loginValidationSchema } from "../../../validations/authValidation.ts";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../hooks/reduxHooks.ts";
import { menteeAsyncLogin } from "../../../slices/menteesAuthSlice.ts";
import { mentorAsyncLogin } from "../../../slices/mentorsAuthSlice.ts";
import { moderatorAsyncLogin } from "../../../slices/moderatorsAuthSlice.ts";
import { routesFrontend } from "../../../constants/frontendRoutes.ts";
import GoogleSignin from "../GoogleSignin/GoogleSignin.tsx";

let LOGIN_URL: string;
let mentee: boolean;
let moderator: boolean;

interface MyFormValues {
  email: string;
  password: string;
}

interface LoginProps {
  role: string;
}

const Login: React.FC<LoginProps> = ({ role }) => {
  const menteeAuthData = useAppSelector((state) => state.menteeAuth);
  const mentorAuthData = useAppSelector((state) => state.mentorAuth);
  const moderatorAuthData = useAppSelector((state) => state.moderatorAuth);

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
    if (menteeAuthData.isMenteeAuthenticated) {
      navigate("/");
    }
  }, [menteeAuthData, navigate]);

  useEffect(() => {
    if (mentorAuthData.isMentorAuthenticated) {
      navigate("/");
    }
  }, [mentorAuthData, navigate]);

  useEffect(() => {
    if (moderatorAuthData.isModeratorAuthenticated) {
      navigate("/");
    }
  }, [moderatorAuthData]);

  const handleSubmit = async (
    values: MyFormValues,
    { setSubmitting, setFieldError }
  ) => {
    console.log("Form entry:", values);
    try {
      //For mentees
      if (role === "mentees") {
        const dispachResponse = dispatch(menteeAsyncLogin(values));
        dispachResponse
          .then((res) => {
            console.log("res", res);
            if (res?.type === "auth/mentees/rejected") {
              if (res?.error.message === "Request failed with status code 401")
                setFieldError(
                  "password",
                  "Please verify the entered Email and Password"
                );
              else if (res?.error.message === "Network Error")
                setFieldError("password", "Please try again later");
            }
          })
          .catch((error) => {
            console.log("error from catch", error?.error.message);
            // if(error.?error.message)
          });
      }

      //For Mentors

      if (role === "mentors") {
        const dispachResponse = dispatch(mentorAsyncLogin(values));

        dispachResponse
          .then((res) => {
            console.log("res", res);
            if (res?.type === "auth/mentees/rejected") {
              if (res?.error.message === "Request failed with status code 401")
                setFieldError(
                  "password",
                  "Please verify the entered Email and Password"
                );
              else if (res?.error.message === "Network Error")
                setFieldError("password", "Please try again later");
            }
          })
          .catch((error) => {
            console.log("error from catch", error?.error.message);
            setFieldError("password", "Please try again later");
          });
      }
      //For Moderator
      if (role === "moderators") {
        const dispachResponse = dispatch(moderatorAsyncLogin(values));
        dispachResponse
          .then((res) => {
            console.log("res", res);
            if (res?.type === "auth/mentees/rejected") {
              if (res?.error.message === "Request failed with status code 401")
                setFieldError(
                  "password",
                  "Please verify the entered Email and Password"
                );
              else if (res?.error.message === "Network Error")
                setFieldError("password", "Please try again later");
            }
          })
          .catch((error) => {
            console.log("error from catch", error?.error.message);
            setFieldError("password", "Please try again later");
          });
      }
    } catch (error) {
      console.log(error);
    }
    setSubmitting(false);
  };

  const initialValues: MyFormValues = { email: "", password: "" };
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-light-100 sm:text-sm sm:leading-6"
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-100 focus:ring-2 focus:ring-inset focus:ring-grey-100 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500"
                  />
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
