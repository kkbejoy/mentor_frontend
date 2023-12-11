import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTicketsRaisedByThisMentee } from "../../../slices/MenteeSlices/TicketsList";
import { extractDateFromInput } from "../../../utilities/timeManagementFunctions";
import RaiseANewTicketModal from "../../General/Modals/RaiseANewTicketModal";
import { userTypes } from "../../../constants/constants";

const TicketsListMenteeSide = ({ pageRerenderFunction, userType }) => {
  const [ticketModal, setTicketModal] = useState(false);
  const dispatch = useDispatch();

  const ticketsListMenteeSide = useSelector(
    (state) => state?.menteeSideTicektsList?.data
  );

  console.log("Tickets list", ticketsListMenteeSide);

  return (
    <div className=" h-screen ">
      <RaiseANewTicketModal
        userType={userTypes.MENTEE}
        modalState={ticketModal}
        modalFunction={setTicketModal}
        pageRerenderFunction={pageRerenderFunction}
      />
      <div className="text-right">
        <button
          onClick={() => setTicketModal(!ticketModal)}
          className="bg-red-600 text-white p-3 rounded-lg m-6"
        >
          Raise a new Ticket
        </button>
        {ticketModal ? <button>Hello</button> : null}
      </div>
      <table className="mx-auto mt-4 max-w-5xl min-w-5xl px-6">
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
                {ticket?.accused?.accusedId?.firstName}
                {ticket?.accused?.accusedId?.lastName}
              </td>
              <td className="py-3 px-6">{time}</td>
              <td className="py-3 px-6">{ticket?.status}</td>
              <td className="py-3 px-6 ">{ticket?.content}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default TicketsListMenteeSide;
