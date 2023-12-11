import { useState } from "react";

const useLocalStorage = (key, initialValue) => {
  // Get the initial value from localStorage if it exists, or use the provided initialValue.
  const storedValue = localStorage.getItem(key) || initialValue;

  // Create state to store the current value.
  const [value, setValue] = useState(storedValue);

  // Define a function to update the value and store it in localStorage.
  const updateValue = (newValue) => {
    const jsonString = JSON.stringify(newValue);
    setValue(jsonString);

    console.log("from useLocalStoreage", jsonString, key);
    localStorage.setItem(key, jsonString);
  };

  return [value, updateValue];
};

export default useLocalStorage;
