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
