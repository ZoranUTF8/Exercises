import React from "react";
import Part from "./Part";
import Total from "./Total";
const Content = ({ parts }) => {
  const totalExercises = parts.reduce(
    (accum, currentnum) => (accum += currentnum.exercises),
    0
  );

  return (
    <div>
      {parts.map((part) => (
        
        <Part part={part} key={part.id} />
      ))}
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default Content;
