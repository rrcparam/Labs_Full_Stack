import { useState } from "react";

export function useFormInput(initialValue: string) {
  const [value, setValue] = useState<string>(initialValue);
  const [message, setMessage] = useState<string>("");

  const validate = (callback: (value: string) => string | null) => {
    const result = callback(value);

    if (result) {
      setMessage(result);
      return false;
    }

    setMessage("");
    return true;
  };

  return {
    value,
    setValue,
    message,
    validate
  };
}