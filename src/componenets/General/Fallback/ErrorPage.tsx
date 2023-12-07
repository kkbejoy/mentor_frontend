import React from "react";
import { useRouteError, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ErrorPage = () => {
  const error = useRouteError();
  console.log("Router Error", error);
  const navigate = useNavigate();
  const handleGoHomePage = async () => {
    try {
      navigate("/");
    } catch (error) {
      toast.error("Error Excecuting the Operation ");
    }
  };
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-mentorBlue mx-auto">
      <div className=" ">
        <h1 className="text-center text-white mx-auto items-center">
          Something Went Wrong....!!! Please Go Back to HomePage
        </h1>
        <p className="text-base font-semibold text-indigo-200 mx-auto">
          {error.data}
        </p>

        <div className="flex items-center mt-6">
          <button
            onClick={handleGoHomePage}
            className="text-center mx-auto bg-green-400 rounded-md p-3"
          >
            Home Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
