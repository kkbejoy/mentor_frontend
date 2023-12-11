import React, { useEffect, useState } from "react";
import Table from "./Table Layout/MentorTable";
import { mentorsListColumns } from "./Columns/MentorsListColumn";
import { useDispatch, useSelector } from "react-redux";
import { fetchMentosList } from "../../../slices/ModeratorSlices/mentorsTableSlice";

const MentorsListsComponent = () => {
  const [loadingStatus, isLoading] = useState(false);
  const disptch = useDispatch();

  const mentorsListArray = useSelector(
    (state) => state.mentorsList.data.mentors
  );
  // console.log("Mentees List Array From Mentes-list page", menteesListArray);
  useEffect(() => {
    disptch(fetchMentosList());
  }, []);

  if (loadingStatus) return <div>is Loading</div>;

  return (
    <>
      <div className="mx-14 my-14">
        {mentorsListArray && (
          <Table columns={mentorsListColumns} data={mentorsListArray} />
        )}
      </div>
    </>
  );
};

export default MentorsListsComponent;
