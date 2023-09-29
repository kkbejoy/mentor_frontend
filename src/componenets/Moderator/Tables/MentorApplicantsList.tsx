import React, { useEffect, useState } from "react";
import Table from "./Table Layout/MentorApplicantsLayout";
import { menteesListColumns } from "./Columns/MenteesListColumn";
import { useDispatch, useSelector } from "react-redux";
import { fetchMentorApplicantsList } from "../../../slices/ModeratorSlices/mentorApplicantsSlice";
import { mentorsListColumns } from "./Columns/MentorsListColumn";

const MentorApplicantsListsComponent = () => {
  const [loadingStatus, isLoading] = useState(false);
  const disptch = useDispatch();

  const mentorApplicantsListArray = useSelector(
    (state) => state.mentorApplicantsList.data.allMentorRequests
  );
  console.log(
    "Mentor Applicants List Array From Mentes-list page",
    mentorApplicantsListArray
  );
  useEffect(() => {
    console.log("use Effects");
    disptch(fetchMentorApplicantsList());
  }, []);

  if (loadingStatus) return <div>is Loading</div>;

  return (
    <>
      <div className="mx-14 my-14">
        {mentorApplicantsListArray && (
          <Table
            columns={mentorsListColumns}
            data={mentorApplicantsListArray}
          />
        )}
      </div>
    </>
  );
};

export default MentorApplicantsListsComponent;
