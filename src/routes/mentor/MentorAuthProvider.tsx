import { LoginPage } from "../../pages/LoginPage";
import { ReactNode } from "react";
// import { RootState } from "../../state/rooState";

interface MentorAuthProviderProps {
  children: ReactNode;
}

const MentorAuthProvider = ({ children }: MentorAuthProviderProps) => {
  let mentorAuthData = localStorage.getItem("mentorAuth");
  mentorAuthData = JSON.parse(mentorAuthData);

  console.log("Mentee Auth", mentorAuthData);
  const isMentorAuthenticated = mentorAuthData?.isMentorAuthenticated;

  console.log("Mentee Auth", isMentorAuthenticated);

  return <>{isMentorAuthenticated ? children : <LoginPage />}</>;
};

export default MentorAuthProvider;
