import { useSelector } from "react-redux";
import { LoginPage } from "../../pages/LoginPage";
import { ReactNode } from "react";
// import { RootState } from "../../state/rooState";

// interface MenteeAuthProviderProps {
//   children: ReactNode;
// }

const MenteeAuthProvider = ({ children }) => {
  let menteeAuthData = localStorage.getItem("menteeAuth");
  menteeAuthData = JSON.parse(menteeAuthData);

  console.log("Mentee Auth", menteeAuthData);
  const isMenteeAuthenticated = menteeAuthData?.isMenteeAuthenticated;

  console.log("Mentee Auth", isMenteeAuthenticated);

  return <>{isMenteeAuthenticated ? children : <LoginPage />}</>;
};

export default MenteeAuthProvider;
