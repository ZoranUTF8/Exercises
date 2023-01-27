const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  const Header = (props) => {
    const { name } = props.course;
    return <h1>{name}</h1>;
  };

  const Part = (props) => {
    const { part } = props;
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    );
  };

  const Content = (props) => {
    const {
      course: { parts },
    } = props;
    return (
      <>
        {parts.map((part) => (
          <Part part={part} />
        ))}
      </>
    );
  };

  const Total = (props) => {
    const {
      course: { parts },
    } = props;
    const results = parts.reduce(
      (accum, currentnum) => accum + currentnum.exercises,
      0
    );

    return <p>Number of exercises {results}</p>;
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default App;
