import React, { useEffect, useState } from "react";
import UserProfileComponent from "./UserProfileComponent/UserProfileComponent";
import SearchBoxComponent from "./SearchBox/SearchBoxComponent";
import NavbarHome from "../Navbar/navbar";
import FooterComponent from "../Footer/FooterComponent";
import { useDispatch } from "react-redux";
import { FETCH_DATA } from "../../../constants/stateConstants";
import { userTypes } from "../../../constants/constants";
import { sortMessages } from "../../../utilities/chatUtilities";

const ChatUsersListComponent = ({
  conversationsList,
  userType,
  conversationId,
}) => {
  const [searchString, setSearchString] = useState();
  // console.log("Conversations list1", conversationsList);
  const filteredConversationListMenteeSide = conversationsList?.filter(
    (conversations) => {
      return conversations?.participants[0]?.mentor?.firstName
        ?.toLowerCase()
        .includes(searchString?.toLowerCase());
    }
  );
  const filteredConversationListMentorSide = conversationsList?.filter(
    (conversations) => {
      return conversations?.participants[0]?.mentee?.firstName
        ?.toLowerCase()
        .includes(searchString?.toLowerCase());
    }
  );
  const conversations = searchString
    ? userType === userTypes.MENTEE
      ? filteredConversationListMenteeSide
      : filteredConversationListMentorSide
    : conversationsList;
  console.log("Conversations list1", conversations);

  return (
    <>
      <section className="bg-white h-[100vh] overflow-x-hidden overflow-y-visible w-1/4 mt-3 ">
        {/* Search COmponent */}
        <SearchBoxComponent searchName={setSearchString} />
        {/* profileCards */}
        {conversationsList
          ? conversations.map((profile) => {
              // console.log("MentorProfile", profile);
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
