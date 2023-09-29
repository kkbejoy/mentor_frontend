import React, { useEffect } from "react";
import MentorCards from "../General/Cards/MentorCards";
import { useDispatch, useSelector } from "react-redux";
import { fetchMentorsListUsingSearchInput } from "../../slices/MenteeSlices/mentorSearchResultSlice";
export const MentorSearchResultComponent = () => {
  const dispatch = useDispatch();
  const search =
    useSelector((state) => state.mentorSearchInput.searchText) || null;
  const mentorsListArray = useSelector(
    (state) => state.mentorSearchResult.data.mentorsSearchResult
  );

  const isMentorListLoading = useSelector((state) => {
    state.mentorSearchResult.isLoading;
  });
  useEffect(() => {
    dispatch(fetchMentorsListUsingSearchInput(search));
  }, [search]);
  console.log("Mentees List array", mentorsListArray);
  if (!mentorsListArray) {
    return <h1>Loading</h1>;
  }
  return (
    <main className="max-w-screen-x1 mx-auto ">
      {mentorsListArray
        ? mentorsListArray.map((mentor) => <MentorCards mentor={mentor} />)
        : null}
    </main>
  );
};
