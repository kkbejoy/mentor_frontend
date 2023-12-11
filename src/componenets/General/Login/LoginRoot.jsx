import React, { useState } from "react";
import Login from "./Login";
// ... (imports and constants)

const Logintrail = ({ setSuccess, isSuccess }) => {
  const [selectedRole, setSelectedRole] = useState("mentees"); // Default role is 'user'
  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    // console.log(role);
  };

  return (
    <>
      <div className="w-full p-4 flex-col justify-between h-screen">
        <div className="w-full p-4 flex items-center justify-center">
          {selectedRole === "mentees" && (
            <Login
              role="mentees"
              setSuccess={setSuccess}
              isSuccess={isSuccess}
            />
          )}
          {selectedRole === "mentors" && (
            <Login
              role="mentors"
              setSuccess={setSuccess}
              isSuccess={isSuccess}
            />
          )}
          {selectedRole === "modarators" && (
            <Login
              role="moderators"
              setSuccess={setSuccess}
              isSuccess={isSuccess}
            />
          )}
        </div>

        <div className="w-full flex flex-col items-center mt-4">
          <h2 className="text-center text-grey">Account Type</h2>
          <div className="flex space-x-1 mt-2">
            <button
              onClick={() => handleRoleSelection("mentees")}
              className={`${
                selectedRole === "mentees"
                  ? "bg-mentorBlue text-white"
                  : "bg-gray-50"
              } px-4 py-2 rounded-l`}
            >
              Mentees
            </button>
            <button
              onClick={() => handleRoleSelection("mentors")}
              className={`${
                selectedRole === "mentors"
                  ? "bg-mentorBlue text-white"
                  : "bg-gray-50"
              } px-4 py-2 `}
            >
              Mentors
            </button>
            <button
              onClick={() => handleRoleSelection("modarators")}
              className={`${
                selectedRole === "modarators"
                  ? "bg-mentorBlue text-white"
                  : "bg-gray-50"
              } px-4 py-2 rounded-r`}
            >
              Moderator
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Logintrail;
