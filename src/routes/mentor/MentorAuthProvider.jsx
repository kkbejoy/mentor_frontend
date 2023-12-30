import { LoginPage } from "../../pages/LoginPage";
import { ReactNode } from "react";
import { Navigate, redirect } from "react-router-dom";
// import { RootState } from "../../state/rooState";

// interface MentorAuthProviderProps {
//   children: ReactNode;
// }

const MentorAuthProvider = ({ children }) => {
  let mentorAuthData = localStorage.getItem("mentorAuth");
  mentorAuthData = JSON.parse(mentorAuthData);

  // console.log("Mentee Auth", mentorAuthData);
  const isMentorAuthenticated = mentorAuthData?.isMentorAuthenticated;

  console.log("Mentor Auth", isMentorAuthenticated);

  // return <>{isMentorAuthenticated ? children : <LoginPage />}</>;
  //  <>{isMentorAuthenticated ? return <>children</> : redirect("/")}</>;
  if (isMentorAuthenticated) return children;
  return (
    <>
      <Navigate to={"/auth/login?mentors"}></Navigate>
    </>
  );
};

export default MentorAuthProvider;
