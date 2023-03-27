import "./App.css";
import Display from "./Display";
import Button from "./Button";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Display />
        <div>
          <div>
            <Button type="INC" label="+" />
            <Button type="DEC" label="-" />
            <Button type="ZERO" label="0" />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
