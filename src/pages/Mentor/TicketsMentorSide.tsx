import React, { useEffect, useState } from "react";
import NavbarMentor from "../../componenets/Mentor/NavbarMentor";
import TicketsListMentorSide from "../../componenets/Mentor/Tickets/Tickets";
import { fetchTicketsRaisedByThisMentor } from "../../slices/MentorSlices/MentorTicketsSlice";
import { useDispatch } from "react-redux";
import { userTypes } from "../../constants/constants";

const TicketsMentorSidePage = () => {
  const [pageRerender, setPageRerender] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTicketsRaisedByThisMentor());
  }, [pageRerender]);
  return (
    <div>
      <NavbarMentor />
      <TicketsListMentorSide
        pageRerenderFunction={setPageRerender}
        userType={userTypes.MENTOR}
      />
    </div>
  );
};

export default TicketsMentorSidePage;
