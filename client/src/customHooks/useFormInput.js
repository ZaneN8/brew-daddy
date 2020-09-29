import { useState } from "react";

export const useFormInput = (initialValue, name) => {
  const [x, setX] = useState(initialValue);
  return {
    label: name,
    required: "required",
    placeholder: `Enter ${name}`,
    onChange: (e) => setX(e.target.value),
    value: x,
  };
};