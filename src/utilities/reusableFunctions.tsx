//Check the login state of any of the user type

export const checkAuthentication = () => {
  const menteeDataFromLocalStorage = JSON.parse(
    localStorage.getItem("menteeAuth")
  );
  const mentorDataFromLocalStorage = JSON.parse(
    localStorage.getItem("mentorAuth")
  );
  const moderatorDataFromLocalStorage = JSON.parse(
    localStorage.getItem("moderatorAuth")
  );

  const isMenteeAuthenticated =
    menteeDataFromLocalStorage?.isMenteeAuthenticated || false;
  const isMentorAuthenticated =
    mentorDataFromLocalStorage?.isMentorAuthenticated || false;
  const isModeratorAuthenticated =
    moderatorDataFromLocalStorage?.isModeratorAuthenticated || false;

  return (
    isMenteeAuthenticated || isMentorAuthenticated || isModeratorAuthenticated
  );
};

//Get mentee Id from  local storage

export const getMenteeIdFromLocalStorage = () => {
  try {
    const menteeDetails = JSON.parse(localStorage.getItem("menteeAuth"));
    const menteeId = menteeDetails.menteeId;
    // console.log("Mentee Id from Local storage", menteeDetails);
    return menteeId;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//Get users id and Refresh Token from Local Storage, user: menteesAuth/mentorAuth/moderatorAuth
export const getUserIdAndToken = (user) => {
  try {
    const result = JSON.parse(localStorage.getItem(user));

    if (user === "menteeAuth") {
      const refreshToken = result?.refreshToken;
      const menteeId = result?.menteeId;
      // console.log({ menteeId, refreshToken });
      return { menteeId, refreshToken };
    } else if (user === "mentorAuth") {
      const refreshToken = result?.refreshToken;
      const mentorId = result?.mentorId;
      // console.log("Mentor Id:", { mentorId, refreshToken });
      return { mentorId, refreshToken };
    } else if (user === "moderatorAuth") {
      const refreshToken = result?.refreshToken;
      const moderatorId = result?.moderatorId;
      // console.log({ moderatorId, refreshToken });
      return { moderatorId, refreshToken };
    }
  } catch (error) {
    console.log(error);
  }
};

//DELETE a user from local storage on logout
export const deleteUserFromLocalStoreage = async (user) => {
  try {
    console.log("Role from delete local", user);
    localStorage.removeItem(user);

    return;
  } catch (error) {
    console.log(error);
  }
};
