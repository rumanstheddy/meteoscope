import { useEffect, useState } from "react";

const useDebounce = (value, delay = 500) => {
  const [deDebouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return deDebouncedValue;
};

export default useDebounce;
