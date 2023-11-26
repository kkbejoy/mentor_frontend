import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useDispatch } from "react-redux";
import { fetchUpcomingLivesMentorHomePage } from "../../slices/MentorSlices/HomePageLiveList";
import { getMentorNameFromLocalStorage } from "../../utilities/localStorageUtilities";
import { getMenteeIdFromLocalStorage } from "../../utilities/reusableFunctions";
const VideoCallInterfaceMentorSidePage = () => {
  const dispatch = useDispatch();
  const { conversationId: roomID } = useParams();
  const mentorName = getMentorNameFromLocalStorage();
  const mentorId = getMenteeIdFromLocalStorage();
  const meeting = async (element) => {
    const appID = 798306425;
    const serverSecret = "54da5b074b807672e0d2fa3d53c05d40";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      Date.now().toString(),
      mentorName
    );
    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Copy Link",
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showPreJoinView: false,

      showScreenSharingButton: true,
    });
  };
  return (
    <div>
      <div ref={meeting} />
    </div>
  );
};

export default VideoCallInterfaceMentorSidePage;
