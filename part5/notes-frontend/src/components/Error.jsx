import React from "react";
import PropTypes from "prop-types";

const Error = ({ message }) => {
  if (!message) {
    return null;
  }
  return <div className="error">{message}</div>;
};
Error.propTypes = {
  message: PropTypes.string.isRequired,
};
export default Error;
