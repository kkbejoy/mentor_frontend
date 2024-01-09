export const isMenteeAuthenticated = () => {
  try {
    const menteeDetails = localStorage.getItem("menteeAuth");
    return menteeDetails;
  } catch (error) {
    console.log(error);
  }
};
