import { useSelector } from "react-redux";
import { LoginPage } from "../../pages/LoginPage";
import { ReactNode } from "react";
// import { RootState } from "../../state/rooState";

// interface ModeratorAuthProviderProps {
//   children: ReactNode;
// }

const ModeratorAuthProvider = ({ children }) => {
  let moderatorAuthData = localStorage.getItem("moderatorAuth");
  // console.log(moderatorAuthData);
  moderatorAuthData = JSON.parse(moderatorAuthData);

  console.log("Mentee Auth", moderatorAuthData);
  const isModeratorAuthenticated = moderatorAuthData?.isModeratorAuthenticated;

  console.log("Mentee Auth", isModeratorAuthenticated);

  return <>{isModeratorAuthenticated ? children : <LoginPage />}</>;
};

export default ModeratorAuthProvider;
