import React from "react";

const Error = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }

  return <div className="error-message">{errorMessage}</div>
};

export default Error;
