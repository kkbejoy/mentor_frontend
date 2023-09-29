import React, { useState } from "react";
import { useTable } from "react-table";
import { mentorApplicantsRequestAcceptAPI } from "../../../../api/moderatorConfiguration/moderatorServices";
import { useDispatch } from "react-redux";
import BlockButtonComponent from "../../../General/Buttons/Block Button/BlockButtonComponent";
import { fetchMentorApplicantsList } from "../../../../slices/ModeratorSlices/mentorApplicantsSlice";

//Moderator -Mentor List- Make this into reusable components
const Table = ({ columns, data }) => {
  const disptch = useDispatch();

  const [isUpdated, setIsUpdated] = useState(false);
  //Function to block Mentor
  const handleButtonClick = (id, name, email) => {
    try {
      console.log("Mentor Approval Button Clicked");
      const response = mentorApplicantsRequestAcceptAPI(id, name, email);

      response.then((res) => {
        disptch(fetchMentorApplicantsList());
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  //Block/Unblock Button to table
  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Status",
        Header: "Status",
        Cell: ({ row }) => (
          // {row.original.isBlocked ? "Blocked" : "Active"},
          console.log("row if", row.original),
          (
            <BlockButtonComponent
              id={row.original._id}
              name={row.original.firstName}
              email={row.original.email}
              currentStatus={row.original.isApproved ? "Active" : "Inactive"}
              buttonClickFunction={handleButtonClick}
              isUpdated={isUpdated}
            />
          )
        ),
      },
    ]);
  };
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      tableHooks
    );
  // console.log(useTable);
  return (
    <div className="mx-auto my-4 p-4 bg-white rounded-lg shadow-lg w-full rounded-lg my-14 px-14">
      <table {...getTableProps()} className="table-auto border-collapse w-full">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr className="bg-gray-200" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className="font-semibold text-sm"
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr className="hover:bg-gray-100" {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      className="p-2 border truncate text-center"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
