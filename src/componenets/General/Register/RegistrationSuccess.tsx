//Just  a copied version
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const RegistrationSuccssComponent: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimeOut = setTimeout(() => {
      navigate("/");
    }, 3000);
    return () => clearTimeout(redirectTimeOut);
  }, []);
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            User Successfully Registered
          </h2>
          <h4 className="mt-1 text-center text-lg font-thin leading-9 tracking-tight text-gray-900">
            Please Login to continue
          </h4>
        </div>
      </div>
    </>
  );
};

export default RegistrationSuccssComponent;
