import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { extractDateFromInput } from "../../../utilities/timeManagementFunctions";
import { fetchTicketsRaisedByThisMentor } from "../../../slices/MentorSlices/MentorTicketsSlice";
import RaiseANewTicketModal from "../../General/Modals/RaiseANewTicketModal";
import { userTypes } from "../../../constants/constants";
import { Link } from "react-router-dom";
import ConfirmModal from "./Table Layout/ConfirmModal";
import { toast } from "sonner";
import { modifyTicketStatus } from "../../../api/moderatorConfiguration/moderatorServices";

const TicketsListModeratorSide = ({ pageRerenderFunction }) => {
  const [ticketModal, setTicketModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const ticketsListModatorSide = useSelector(
    (state) => state?.moderatorSideTicketsList?.data
  );

  console.log("Tickets list", ticketsListModatorSide);

  //Function that controls modal

  const modalContol = async (ticket) => {
    console.log("This ticket", ticket);
    try {
      setSelectedTicket({ ...ticket });
      setTicketModal(true);
    } catch (error) {
      console.log(error);

      toast.error("Something went Wrong");
    }
  };
  //Function that Blocks user
  const handleAccussedBlockButtonClick = async () => {
    try {
      setIsLoading(true);
      console.log("User type:", selectedTicket);
      const ticketId = selectedTicket?._id;
      const responseFromAPI = await modifyTicketStatus(ticketId);
      setIsLoading(false);
      pageRerenderFunction({ ...responseFromAPI });
      setTicketModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" h-screen ">
      <ConfirmModal
        modalState={ticketModal}
        modalStateControlFunction={setTicketModal}
        onConfirmExcecutableFunction={handleAccussedBlockButtonClick}
        message={"Are you sure you want to proceed with the action....?"}
        loadingState={isLoading}
        loadingFunction={setIsLoading}
      />

      <div className="text-lefts">
        {/* <h1 className="font-semibold mt-4 ml-28 text-2xl">Tickets Raised </h1> */}
      </div>

      <table className="mx-auto mt-4 max-w-8xl min-w-5xl p-11">
        <tr className="border-b border-gray-200 hover:bg-gray-100  shadow-md">
          <th className="py-3 px-6 text-center">Sl</th>
          <th className="py-3 px-6">Complainant</th>
          <th className="py-3 px-6">Complainant Role</th>
          <th className="py-3 px-6">Accussed</th>{" "}
          <th className="py-3 px-6">Accussed Role</th>
          <th className="py-3 px-6">Date of Raising Ticket</th>
          <th className="py-3 px-6">Status</th>
          <th className="py-3 px-6">Details</th>
          <th className="py-3 px-6">Actions</th>
        </tr>
        {/* //Table data */}
        {ticketsListModatorSide?.map((ticket, index) => {
          const time = extractDateFromInput(ticket?.createdAt);
          return (
            <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-center shadow-sm">{index + 1}</td>
              <td className="py-3 px-6">
                {ticket?.complainant?.complainantId?.firstName +
                  " " +
                  ticket?.complainant?.complainantId?.lastName}
              </td>
              <td className="py-3 px-6">
                {" "}
                {ticket?.complainant?.complainantType}
              </td>
              <td className="py-3 px-6">
                <h1 className="font-bold text-red-800 hover:scale-105">
                  <Link
                    to={`/browse/mentor/profile/${ticket?.accused?.accusedId?._id}`}
                    target="_blank"
                  >
                    {" "}
                    {ticket?.accused?.accusedId?.firstName +
                      " " +
                      ticket?.accused?.accusedId?.lastName}
                  </Link>
                </h1>
              </td>
              <td className="py-3 px-6"> {ticket?.accused?.accusedType}</td>
              <td className="py-3 px-6">{time}</td>
              <td className="py-3 px-6">{ticket?.status}</td>
              <td className="py-3 px-6">{ticket?.content}</td>
              <td className="py-3 px-6">
                <button
                  onClick={() => modalContol(ticket)}
                  className="bg-red-600 w-20 rounded-md text-white p-2 hover:scale-105"
                >
                  Act
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default TicketsListModeratorSide;
