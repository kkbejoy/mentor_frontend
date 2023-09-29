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
      <form className=" mx-14 my-14 drop-shadow-md hover:ring-red">
        <input
          onChange={handleSearchInput}
          className=" py-3 px-4  w-2/5 pr-10 sm:text-sm  rounded-md"
          type="search"
          placeholder={searchText}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        ></input>
        {/* <button
          className="ais-SearchBox-submit"
          type="submit"
          title="Submit the search query."
        >
          <svg
            className="ais-SearchBox-submitIcon"
            width="10"
            height="10"
            viewBox="0 0 40 40"
            aria-hidden="true"
          ></svg>
        </button>
        <button
          className="ais-SearchBox-reset"
          type="reset"
          title="Clear the search query."
        >
          <svg
            className="ais-SearchBox-resetIcon"
            viewBox="0 0 20 20"
            width="10"
            height="10"
            aria-hidden="true"
          >
            <path d="M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z"></path>
          </svg>
        </button> */}
      </form>
    </>
  );

  //   return (
  //     <div className="relative mb-3 " data-te-input-wrapper-init>
  //       <input
  //         type="search"
  //         className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
  //         id="searchBox"
  //         placeholder="Type query"
  //       />
  //       <label
  //         htmlFor="searchBox"
  //         className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-black-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
  //       >
  //         Search
  //       </label>
  //     </div>
  //   );
};

export default SearchComponent;
