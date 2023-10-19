import React, { useEffect, useState } from "react";
import UserProfileComponent from "./UserProfileComponent/UserProfileComponent";
import SearchBoxComponent from "./SearchBox/SearchBoxComponent";
import NavbarHome from "../Navbar/navbar";
import FooterComponent from "../Footer/FooterComponent";
import { useDispatch } from "react-redux";
import { FETCH_DATA } from "../../../constants/stateConstants";

const ChatUsersListComponent = ({ conversationsList, userType }) => {
  // console.log("Conversations list", conversationsList);

  return (
    <>
      <section className="bg-white h-[100vh] overflow-x-hidden overflow-y-visible w-1/4 ">
        {/* Search COmponent */}
        <SearchBoxComponent />
        {/* profileCards */}
        {conversationsList
          ? conversationsList.map((profile) => {
              return (
                <UserProfileComponent userType={userType} profile={profile} />
              );
            })
          : null}
      </section>
    </>
  );
};

export default ChatUsersListComponent;
