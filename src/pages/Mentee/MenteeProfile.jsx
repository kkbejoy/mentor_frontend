import React, { useEffect, useState } from "react";
import NavbarMentee from "../../componenets/Mentee/NavbarMentee";
import HorizontalDivider from "../../componenets/General/HorizontalDivider/HorizontalDivider";
import MenteeProfileEditComponent from "../../componenets/Mentee/Profile/MenteeProfileEditComponent";
import { fetchMenteeProfileData } from "../../slices/MenteeSlices/menteeProfileDetail";
import { useDispatch, useSelector } from "react-redux";

const MenteeProfile = () => {
  const [reRender, setRerender] = useState({});
  const dispatch = useDispatch();
  const menteeProfileData = useSelector(
    (state) => state?.menteeProfileDetails?.data
  );
  console.log("Mentee Proifle deails", menteeProfileData);
  useEffect(() => {
    dispatch(fetchMenteeProfileData());
  }, [reRender]);

  return (
    <div>
      <NavbarMentee />
      <HorizontalDivider title={"Mentee Profile"} />
      <MenteeProfileEditComponent
        profile={menteeProfileData}
        reRenderFunction={setRerender}
      />
      {/* <MenteeProfileImageUploader /> */}
    </div>
  );
};

export default MenteeProfile;
