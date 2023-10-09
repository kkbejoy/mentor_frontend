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
      <form className=" mx-14 my-14 drop-shadow-md hover:ring-red text-center">
        <input
          onChange={handleSearchInput}
          className=" py-3 px-4  w-2/5 pr-10 sm:text-sm  rounded-md"
          type="search"
          placeholder="Search for Skills,Mentors"
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
