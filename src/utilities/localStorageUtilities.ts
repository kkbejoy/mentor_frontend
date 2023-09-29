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
