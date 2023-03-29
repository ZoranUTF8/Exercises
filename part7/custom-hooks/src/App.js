import useCounter from "./useCounter";
import FormInput from "./formInput";
import "./App.css";

function App() {
  const counter = useCounter();
  return (
    <div className="App">
      {/* //! Ex 1 */}
      {/* <h1>{counter.value}</h1>
      <button onClick={counter.increase}>+</button>

      <button onClick={counter.decrease}>-</button>

      <button onClick={counter.zero}>Reset</button> */}
      {/* //! Ex 2 */}
      <FormInput />
    </div>
  );
}

export default App;
