import React from "react";
import { setMentorSearchText } from "../../../slices/MenteeSlices/searchSlice";
import { useDispatch, useSelector } from "react-redux";
const SearchComponent = () => {
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.mentorSearchInput.searchText);
  console.log("Search Input", searchText);

  const handleSearchInput = (event) => {
    const searchText = event.target.value;
    dispatch(setMentorSearchText(searchText));
  };
  // useEffect(() => {});
  return (
    <>
      <form className=" mx-14 my-14 drop-shadow-lg text-center hover:shadow-yellow-100 ">
        <input
          onChange={handleSearchInput}
          className=" py-3 px-4 text-center text-lg w-2/5 pr-10 sm:text-sm  rounded-md focus:text-left focus:border-collapse"
          type="search"
          placeholder="Search Skills and Mentors"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        ></input>
      </form>
    </>
  );
};

export default SearchComponent;
