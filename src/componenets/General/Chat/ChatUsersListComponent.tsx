import React, { useEffect, useState } from "react";
import UserProfileComponent from "./UserProfileComponent/UserProfileComponent";
import SearchBoxComponent from "./SearchBox/SearchBoxComponent";
import NavbarHome from "../Navbar/navbar";
import FooterComponent from "../Footer/FooterComponent";
import { useDispatch } from "react-redux";
import { FETCH_DATA } from "../../../constants/stateConstants";

const ChatUsersListComponent = ({
  conversationsList,
  userType,
  conversationId,
}) => {
  console.log("Conversations list1", conversationsList);

  return (
    <>
      <section className="bg-white h-[100vh] overflow-x-hidden overflow-y-visible w-1/4 ">
        {/* Search COmponent */}
        <SearchBoxComponent />
        {/* profileCards */}
        {conversationsList
          ? conversationsList.map((profile) => {
              console.log("MentorProfile", profile);
              const activeOrNot =
                profile?._id === conversationId ? true : false;
              return (
                <UserProfileComponent
                  key={profile._id}
                  userType={userType}
                  profile={profile}
                  conversationId={conversationId}
                  activeOrNot={activeOrNot}
                />
              );
            })
          : null}
      </section>
    </>
  );
};

export default ChatUsersListComponent;
