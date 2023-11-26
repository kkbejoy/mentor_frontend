import React, { useEffect, useState } from "react";
import NavbarModerator from "../../componenets/Moderator/NavbarModerator";
import HorizontalDivider from "../../componenets/General/HorizontalDivider/HorizontalDivider";
import { useDispatch } from "react-redux";
import { fetchTicketsRaisedFromModeratorSide } from "../../slices/ModeratorSlices/ticketsListSlice";
import TicketsListModeratorSide from "../../componenets/Moderator/Tables/TickersComponent";

const TicketsPage = () => {
  const [reRender, setRerender] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTicketsRaisedFromModeratorSide());
  }, [reRender]);

  return (
    <div>
      <NavbarModerator />
      <HorizontalDivider title={"Tickets"} />
      <TicketsListModeratorSide pageRerenderFunction={setRerender} />
    </div>
  );
};

export default TicketsPage;
