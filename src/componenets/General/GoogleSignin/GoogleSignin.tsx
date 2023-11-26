import React from "react";
import { menteeAsyncLogin } from "../../../slices/menteesAuthSlice";
import { menteeGoogleSignIn } from "../../../api/menteesConfiguration/menteeServices";
import { BASE_URL } from "../../../constants/constants";
import END_POINTS from "../../../constants/endpoints";
import { useLocation, useNavigate } from "react-router-dom";

const GoogleSignin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleGoogleSignIn = async () => {
    try {
      let timer: NodeJS.Timeout | null = null;
      console.log("Google Sign in function");
      const windowOutput = window.open(
        BASE_URL + END_POINTS.MENTEE_GOOGLE_AUTH,
        "_blank",
        "width:500,height:500"
      );

      if (windowOutput) {
        timer = setInterval(() => {
          if (windowOutput.closed) {
            console.log("authenticated", location);

            if (location?.pathname === "/auth/login") {
              navigate("/mentees");
            } else {
              window.location.reload();
            }

            if (timer) clearInterval(timer);
          }
        }, 500);
        // if (timer) clearInterval(timer);
      }
      // const responseFromServer = await menteeGoogleSignIn();
      // console.log("Output", windowOutput);

      // responseFromServer?.then((res) => {
      //   console.log(res);
      //   const authWindow = window.open(
      //     "/api/mentees/google_auth_mentee",
      //     "_blank"
      //   );

      //   console.log(authWindow);
      // });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button
        onClick={handleGoogleSignIn}
        className="font-semibold text-center mt-5 flex w-full justify-center rounded-md text-indigo-600 hover:text-indigo-500"
      >
        Sign in with Google
      </button>
      {/* </p> */}
    </div>
  );
};

export default GoogleSignin;
