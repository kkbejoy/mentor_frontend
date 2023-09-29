import React, { useEffect, useState } from "react";
import Table from "./Table Layout/MenteeTable";
import { menteesListColumns } from "./Columns/MenteesListColumn";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenteesList } from "../../../slices/ModeratorSlices/menteesTableSlice";

const MenteeListsComponent = () => {
  const [loadingStatus, isLoading] = useState(false);
  const disptch = useDispatch();

  const menteesListArray = useSelector(
    (state) => state.menteesList.data.mentees
  );
  // console.log("Mentees List Array From Mentes-list page", menteesListArray);
  useEffect(() => {
    disptch(fetchMenteesList());
  }, []);

  if (loadingStatus) return <div>is Loading</div>;

  return (
    <>
      <div className="mx-14 my-14">
        {menteesListArray && (
          <Table columns={menteesListColumns} data={menteesListArray} />
        )}
      </div>
    </>
  );
};

export default MenteeListsComponent;
