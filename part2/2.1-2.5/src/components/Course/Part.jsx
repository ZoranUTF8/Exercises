import React from "react";

const Part = ({ part, totalExercises }) => {
  console.log(part);
  return (
    <>
      <h3>
        {part.name} {part.exercises}
      </h3>
    </>
  );
};

export default Part;
