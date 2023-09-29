import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { menteeAsyncLogout } from "../../../slices/menteesAuthSlice";
import { getUserIdAndToken } from "../../../utilities/reusableFunctions";
import { useNavigate } from "react-router-dom";

const LogoutComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const handleLogout = async () => {
    try {
      setLoading(true);
      const menteeLoggedinDetails = await getUserIdAndToken("menteeAuth");

      const resp = dispatch(menteeAsyncLogout(menteeLoggedinDetails));
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
