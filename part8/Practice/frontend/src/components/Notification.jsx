import { useEffect } from "react";

const Notify = ({ errorMessage, setErrorMessage }) => {
  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  }, [errorMessage]);

  return (
    <div
      style={{
        color: "red",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      {errorMessage ? errorMessage : null}
    </div>
  );
};

export default Notify;
