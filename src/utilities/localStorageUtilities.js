import { toast } from "sonner";

export const editLocalStorageField = async (storeName, filedName, newValue) => {
  try {
    console.log(storeName, filedName, newValue);
    let dataFromLocalStorage = JSON.parse(localStorage.getItem(storeName));
    dataFromLocalStorage[filedName] = newValue;
    dataFromLocalStorage = JSON.stringify(dataFromLocalStorage);
    // console.log(
    //   "Local storage status after updating accessToken",
    //   dataFromLocalStorage.filedName === newValue
    // );
    localStorage.setItem(storeName, dataFromLocalStorage);
    return true;
  } catch (error) {
    console.log(error);
  }
};

//Delete Local storage Function

export const deleteFromLocalStorage = async (user) => {
  try {
    const response = localStorage.removeItem(user);
    console.log("Response from local DElete Locally stored User", response);
  } catch (error) {
    console.log("Error Deleting from local storage", error);
    toast.error("Something Went Wrong. Please Log out and Try again later");
  }
};

//Get mentee Name from Local Storage
export const getMenteeNameFromLocalStorage = () => {
  try {
    const menteeDetails = JSON.parse(localStorage.getItem("menteeAuth"));
    const menteeName = menteeDetails?.menteeName;
    console.log("Mentee Id from Local storage", menteeDetails);
    return menteeName;
  } catch (error) {
    console.log("Mentee id error", error);
    throw error;
  }
};
export const getMenteeProfileImageUrl = () => {
  try {
    const menteeDetails = JSON.parse(localStorage.getItem("menteeAuth"));
    const profileImageUrl = menteeDetails?.profileImageUrl;
    return profileImageUrl;
  } catch (error) {
    console.log(error);
  }
};

//Get Mentor Name from Local Storage
export const getMentorNameFromLocalStorage = () => {
  try {
    const mentorDetails = JSON.parse(localStorage.getItem("mentorAuth"));
    const mentorName = mentorDetails?.mentorName;
    console.log("Mentee name from Local storage", mentorName);
    return mentorName;
  } catch (error) {
    console.log("Mentor name error", error);
    throw error;
  }
};
