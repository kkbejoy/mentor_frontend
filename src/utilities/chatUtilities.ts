import { userTypes } from "../constants/constants";

export const extractNameAndImageUrlForChat = (
  conversationsList,
  conversationId,
  userType
) => {
  try {
    const profile = conversationsList?.reduce((profile, currentState) => {
      if (
        currentState._id === conversationId &&
        userType === userTypes.MENTEE
      ) {
        profile.name =
          currentState.participants[0]?.mentor.firstName +
          " " +
          currentState.participants[0]?.mentor.lastName;
        profile.imageUrl = currentState.participants[0]?.mentor.profileImageUrl;
      } else if (
        currentState._id === conversationId &&
        userType === userTypes.MENTOR
      ) {
        profile.name =
          currentState.participants[0]?.mentee.firstName +
          " " +
          currentState.participants[0]?.mentee.lastName;
        profile.imageUrl = currentState.participants[0]?.mentor.profileImageUrl;
      }
      return profile;
    }, {});
    return profile;
  } catch (error) {
    console.log(error);
  }
};
