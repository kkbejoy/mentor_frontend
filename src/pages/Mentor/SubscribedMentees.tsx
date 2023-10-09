import React, { useEffect } from "react";
import NavbarMentor from "../../componenets/Mentor/NavbarMentor";
import SubscibedMentorsList from "../../componenets/Mentee/SubscibedMentorsList/SubscibedMentorsList";
import SubscribedMenteesTable from "../../componenets/Mentor/SubscribedMentees/SubscribedMenteesTable";
import { useDispatch } from "react-redux";
import { fetchSubscribedMenteesList } from "../../slices/MentorSlices/subscibedMentees";
import HorizontalDivider from "../../componenets/General/HorizontalDivider/HorizontalDivider";

const SubscribedMentees = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSubscribedMenteesList());
  }, []);
  return (
    <>
      <NavbarMentor />
      <HorizontalDivider title={"Subscribed Mentees"} />
      <SubscribedMenteesTable />
    </>
  );
};

export default SubscribedMentees;
