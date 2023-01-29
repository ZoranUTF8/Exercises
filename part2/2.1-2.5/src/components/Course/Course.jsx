import React from "react";
import Header from "./Header";
import Content from "./Content";

const Course = ({ courses }) => {
  return (
    <div className="courseContainer">
      {courses.map((course) => {
        return (
          <>
            <Header courseName={course.name} />
            <Content parts={course.parts} />
          </>
        );
      })}
    </div>
  );
};

export default Course;
