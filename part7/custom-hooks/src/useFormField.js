import { useState, useToggle } from "react";

const useFormField = (type) => {
  const [value, setValue] = useState("");
  const [isTextChanged, setIsTextChanged] = useToggle();

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export default useFormField;
