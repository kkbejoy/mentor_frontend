import React, { useEffect, useState } from "react";
import NavbarMentee from "../../componenets/Mentee/NavbarMentee";
import TicketsListMenteeSide from "../../componenets/Mentee/Tickets/TicketsListMenteeSide";
import FooterComponent from "../../componenets/General/Footer/FooterComponent";
import { fetchTicketsRaisedByThisMentee } from "../../slices/MenteeSlices/TicketsList";
import { useDispatch } from "react-redux";
import { userTypes } from "../../constants/constants";

const TicketsMenteePage = () => {
  const [pageRerender, setPageRerender] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTicketsRaisedByThisMentee());
  }, [pageRerender]);
  return (
    <div>
      <NavbarMentee />
      <TicketsListMenteeSide
        pageRerenderFunction={setPageRerender}
        userType={userTypes.MENTEE}
      />
      <FooterComponent />
    </div>
  );
};

export default TicketsMenteePage;
