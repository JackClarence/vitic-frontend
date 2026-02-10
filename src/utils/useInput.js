import { useState } from "react";

export function useInput(defValues) {
  const [values, setValues] = useState(defValues);
  function handleChange(evt) {
    const { name, value } = evt.target;
    let newValue = value;
    if(evt.target.name === "percentage"){
      newValue = parseFloat(value);
    };
    setValues({ ...values, [name]: newValue });
  };
  return { values, setValues, handleChange };
};