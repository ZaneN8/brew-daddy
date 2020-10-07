import { useState } from "react";


const useLocalState = (storageKey, defaultValue, callback) => {
  let storedValue = localStorage.getItem(storageKey);

  if(storedValue) {
    storedValue = JSON.parse(storedValue);
    if(callback && typeof callback === "function") {
      storedValue = callback(storedValue, defaultValue);
    }
  }

  const [value, setValue] = useState(storedValue || defaultValue);

  const setLocalValue = (newValue, setLocally=true) => {
    if(setLocally) localStorage.setItem(storageKey, JSON.stringify(newValue));
    setValue(newValue);
  }

  return [value, setLocalValue];
}


export default useLocalState;