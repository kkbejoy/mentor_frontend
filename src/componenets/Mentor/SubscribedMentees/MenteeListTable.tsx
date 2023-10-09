import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTable } from "react-table";
import BlockButtonComponent from "../../General/Buttons/Block Button/BlockButtonComponent";

const MenteeListTable = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const dispatch = useDispatch();

  return (
    <div className="mx-auto my-4 p-6 bg-blue-50 rounded-lg shadow-lg w-full rounded-lg my-14 px-14">
      <table {...getTableProps()} className="table-auto border-collapse w-full">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr className="bg-gray-200" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className="font-semibold text-sm p-3 bg-indigo-100 text-black"
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

export default MenteeListTable;
