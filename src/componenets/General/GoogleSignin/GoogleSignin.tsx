import React from "react";
import { menteeAsyncLogin } from "../../../slices/menteesAuthSlice";
import { menteeGoogleSignIn } from "../../../api/menteesManagement";

const GoogleSignin = () => {
  const handleGoogleSignIn = async () => {
    try {
      console.log("he");
      const responseFromServer = await menteeGoogleSignIn();
      responseFromServer?.then((res) => {
        const authWindow = window.open(res.data.url, "_blank");
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
