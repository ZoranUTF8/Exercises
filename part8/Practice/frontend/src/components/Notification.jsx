import { useEffect } from "react";

const Notify = ({ errorMessage, setError }) => {
  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  }, [errorMessage]);

  return (
    <div style={{ color: "red" }}>{errorMessage ? errorMessage : null}</div>
  );
};

export default Notify;
