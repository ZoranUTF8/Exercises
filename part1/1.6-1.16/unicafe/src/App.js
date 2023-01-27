import { useState } from "react";
import "./unicafe.css";

const Button = ({ option, clickHandler }) => {
  return (
    <div className="FeedbackOption">
      <button onClick={clickHandler} className="FeedbackOption-button">
        {option}
      </button>
    </div>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <h1>
      {text}:{value}
    </h1>
  );
};

const DisplayStats = ({ good, bad, neutral }) => {
  const total = good + bad + neutral;
  const average = (good + bad + neutral) / 3;
  const positive = (bad + neutral) / good;

  if (good > 0 || bad > 0 || neutral > 0) {
    return (
      <div className="stats">
        <div className="resultOptionContainer">
          <table>
            <thead>STATISTIC</thead>
            <tbody>
              <tr>
                <StatisticLine text={"Good"} value={good} />
              </tr>
              <tr>
                <StatisticLine text={"Bad"} value={bad} />
              </tr>
              <tr>
                <StatisticLine text={"Neutral"} value={neutral} />
              </tr>
              <tr>
                <h3>All feedback:{total ? total : 0}</h3>
              </tr>
              <tr>
                <h3>Average: {average.toFixed(2)}</h3>
              </tr>
              <tr>
                <h3>Positive: {positive ? positive : 0}</h3>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  return <h1>No feedback has been given</h1>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const updateGood = () => {
    setGood((prevValue) => prevValue + 1);
  };
  const updateNeutral = () => {
    setNeutral((prevValue) => prevValue + 1);
  };
  const updateBad = () => {
    setBad((prevValue) => prevValue + 1);
  };

  return (
    <div className="App">
      <h1>Give feedback</h1>
      <div className="feedbackContainer">
        <Button option={"good"} clickHandler={updateGood} />
        <Button option={"neutral"} clickHandler={updateNeutral} />
        <Button option={"bad"} clickHandler={updateBad} />
      </div>
      <div className="statsContainer">
        <DisplayStats good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  );
};

export default App;
