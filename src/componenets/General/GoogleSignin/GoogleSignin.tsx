import React from "react";
import { menteeAsyncLogin } from "../../../slices/menteesAuthSlice";
import { menteeGoogleSignIn } from "../../../api/menteesConfiguration/menteeServices";

const GoogleSignin = () => {
  const handleGoogleSignIn = async () => {
    try {
      console.log("he");

      const responseFromServer = await menteeGoogleSignIn();
      console.log(responseFromServer);

      responseFromServer?.then((res) => {
        console.log(res);
        const authWindow = window.open(
          "/api/mentees/google_auth_mentee",
          "_blank"
        );

        console.log(authWindow);
      });
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
