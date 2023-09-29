import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { moderatorAsyncLogout } from "../../../slices/moderatorsAuthSlice";
import { mentorAsyncLogout } from "../../../slices/mentorsAuthSlice";
import { getUserIdAndToken } from "../../../utilities/reusableFunctions";
import { useNavigate } from "react-router-dom";

const LogoutComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const handleLogout = async () => {
    try {
      setLoading(true);
      const moderatorLoggedinDetails = await getUserIdAndToken("moderatorAuth");
      console.log("logout comp", moderatorLoggedinDetails);
      const resp = dispatch(moderatorAsyncLogout(moderatorLoggedinDetails));
      resp.then((res) => {
        console.log(res);
        navigate("/");
      });
      console.log(resp);
      //   responseLogout.then((res)=>{
      //     setLoading(false)
      //   }).catch(error){
      //     setLoading(false)
      //   };
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button onClick={handleLogout}>
        <p className="text-white">Logout</p>
      </button>
    </div>
  );
};

export default LogoutComponent;
