import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { extractDateFromInput } from "../../../utilities/timeManagementFunctions";
import { fetchTicketsRaisedByThisMentor } from "../../../slices/MentorSlices/MentorTicketsSlice";
import RaiseANewTicketModal from "../../General/Modals/RaiseANewTicketModal";
import { userTypes } from "../../../constants/constants";

const TicketsListMentorSide = ({ pageRerenderFunction, userType }) => {
  const [ticketModal, setTicketModal] = useState(false);

  const dispatch = useDispatch();

  const ticketsListMenteeSide = useSelector(
    (state) => state?.mentorSideTickets?.data
  );

  return (
    <div className=" h-screen ">
      <RaiseANewTicketModal
        userType={userTypes.MENTOR}
        modalState={ticketModal}
        modalFunction={setTicketModal}
        pageRerenderFunction={pageRerenderFunction}
      />
      <div className="text-lefts">
        {/* <h1 className="font-semibold mt-4 ml-28 text-2xl">Tickets Raised </h1> */}
      </div>
      <div className="text-right">
        <button
          onClick={() => setTicketModal(!ticketModal)}
          className="bg-red-600 text-white p-3 rounded-lg m-6"
        >
          Raise a new Ticket
        </button>
        {/* {ticketModal ? <button>Hello</button> : null} */}
      </div>
      <table className="mx-auto mt-4 max-w-5xl min-w-5xl">
        <tr className="border-b border-gray-200 hover:bg-gray-100  shadow-md">
          <th className="py-3 px-6 text-center">Sl</th>
          <th className="py-3 px-6">
            Accussed <span className="font-normal">({userType})</span>{" "}
          </th>
          <th className="py-3 px-6">Date of Raising Ticket</th>
          <th className="py-3 px-6">Status</th>
          <th className="py-3 px-6">Details</th>
        </tr>
        {/* //Table data */}
        {ticketsListMenteeSide?.map((ticket, index) => {
          const time = extractDateFromInput(ticket?.createdAt);
          return (
            <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-center shadow-sm">{index + 1}</td>
              <td className="py-3 px-6">
                {ticket?.accused?.accusedId?.firstName}{" "}
                {ticket?.accused?.accusedId?.lastName}{" "}
              </td>
              <td className="py-3 px-6">{time}</td>
              <td className="py-3 px-6">{ticket?.status}</td>
              <td className="py-3 px-6">{ticket?.content}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default TicketsListMentorSide;
