import React, { useEffect } from "react";
import MentorCards from "../General/Cards/MentorCards";
import { useDispatch, useSelector } from "react-redux";
import { fetchMentorsListUsingSearchInput } from "../../slices/MenteeSlices/mentorSearchResultSlice";
import {
  setPriceRange,
  setRating,
} from "../../slices/MenteeSlices/searchSlice";
export const MentorSearchResultComponent = () => {
  const dispatch = useDispatch();

  //Data From Redux Store
  const search =
    useSelector((state) => state?.mentorSearchInput?.searchText) || null;
  const mentorsListArray = useSelector(
    (state) => state?.mentorSearchResult?.data?.mentorsSearchResult
  );

  const price = useSelector((state) => state?.mentorSearchInput?.priceRange);
  const rating = useSelector((state) => state?.mentorSearchInput?.rating);
  const isMentorListLoading = useSelector((state) => {
    state?.mentorSearchResult?.isLoading;
  });
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    // console.log("Input values", search, price, rating);
    dispatch(
      fetchMentorsListUsingSearchInput({ search, price, rating, signal })
    );
    return () => {
      controller.abort();
    };
  }, [search, price, rating]);
  if (!mentorsListArray) {
    return (
      <div className="h-screen flex place-content-center">
        <h1 className="text-lg text-center font-semibold">Loading</h1>
      </div>
    );
  }
  return (
    <main className="max-w-screen-x1 mx-auto min-h-screen">
      {mentorsListArray
        ? mentorsListArray?.map((mentor) => <MentorCards mentor={mentor} />)
        : null}
    </main>
  );
};
