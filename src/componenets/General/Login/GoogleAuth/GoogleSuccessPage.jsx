import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useLocalStorage from "../../../../hooks/useLocalStorage";

const GoogleSuccessPage = () => {
  const [menteeAuth, setMenteeAuth] = useLocalStorage("menteeAuth", {});
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  useEffect(() => {
    const menteeName = queryParams.get("menteeName");
    const menteeId = queryParams.get("menteeId");
    const accessToken = queryParams.get("accessToken");
    const refreshToken = queryParams.get("refreshToken");

    //   const data = params.query.menteeName;
    //   const { menteeName, menteeId, accessToken, refreshToken } = params;
    console.log("location", location);
    console.log(
      "data extracted",
      menteeName,
      menteeId,
      accessToken,
      refreshToken
    );
    const menteeAuthData = {
      isMenteeAuthenticated: true,
      accessToken,
      menteeId,
      menteeName,
      refreshToken,
    };
    setMenteeAuth(menteeAuthData);

    setTimeout(() => {
      console.log("Ging to close");
      window.close();
    }, 1000);
  }, []);
  // Access query parameters

  return <div>Sucessfully Logged into google</div>;
};

export default GoogleSuccessPage;
