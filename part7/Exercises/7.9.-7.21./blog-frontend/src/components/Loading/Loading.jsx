import React from "react";

const Loading = () => {
  return (
    <div className="container fullPage d-flex align-items-center justify-content-center">
      <div className="jumbotron full-height-element d-flex align-items-center justify-content-center flex-column">
        <div className="spinner-border mb-3"></div>
        <h1>Loading</h1>
      </div>
    </div>
  );
};

export default Loading;
