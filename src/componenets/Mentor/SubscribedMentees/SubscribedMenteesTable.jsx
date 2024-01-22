import React from "react";
import { useSelector } from "react-redux";
import { useTable } from "react-table";
import MenteeListTable from "./MenteeListTable";
import { enrollmentDetails } from "./MenteesListColumn";

const SubscribedMenteesTable = () => {
  const menteesList = useSelector((state) => state.subscribedMenteesList.data);
  //   console.log("Use Table", useTable);
  return (
    <>
      <div className="mx-14 my-14 h-screen">
        {menteesList && (
          <MenteeListTable columns={enrollmentDetails} data={menteesList} />
        )}
      </div>
    </>
  );
};

export default SubscribedMenteesTable;
