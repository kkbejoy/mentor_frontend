import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { getMenteeNameFromLocalStorage } from "../../utilities/localStorageUtilities";
import { getMenteeIdFromLocalStorage } from "../../utilities/reusableFunctions";

const VideoCallInterfaceMenteeSidePage = () => {
  const { conversationId: roomID } = useParams();
  console.log("Room id", roomID);
  const menteeName = getMenteeNameFromLocalStorage();
  const menteeId = getMenteeIdFromLocalStorage();
  console.log("Mentee Name", menteeName);
  const meeting = async (element) => {
    const appID = 798306425;
    const serverSecret = "54da5b074b807672e0d2fa3d53c05d40";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      menteeId,
      menteeName
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

export default VideoCallInterfaceMenteeSidePage;
