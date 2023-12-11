import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { getMenteeNameFromLocalStorage } from "../../utilities/localStorageUtilities";
import { getMenteeIdFromLocalStorage } from "../../utilities/reusableFunctions";
import { checkSlotCredentials } from "../../api/menteesConfiguration/menteeServices";
import { set } from "date-fns";
const env = import.meta.env;

const VideoCallInterfaceMenteeSidePage = () => {
  const [authticated, setauthticated] = useState(false);
  const { conversationId: roomID } = useParams();
  console.log("Room id", roomID);
  const menteeName = getMenteeNameFromLocalStorage();
  const menteeId = getMenteeIdFromLocalStorage();
  console.log("Mentee Name", menteeName, authticated);

  const validateCredentials = useCallback(async () => {
    const valid = await checkSlotCredentials(roomID);
    console.log("Valid respo", valid);
    if (valid) setauthticated(true);
    else setauthticated(false);
  }, [roomID]);
  useEffect(() => {
    validateCredentials();
  }, []);
  const meeting = async (element) => {
    const appID = 798306425;
    const serverSecret = "54da5b074b807672e0d2fa3d53c05d40";
    // const {
    //   VITE_ZEGO_CLOUD_appID: appIDString,
    //   VITE_ZEGO_CLOUD_serverSecret: serverSecret,
    // } = env;
    // const appID = parseInt(appIDString);

    // console.log("Envvvvvv", appID, serverSecret);
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
  return <div>{authticated ? <div ref={meeting} /> : null}</div>;
};

export default VideoCallInterfaceMenteeSidePage;
