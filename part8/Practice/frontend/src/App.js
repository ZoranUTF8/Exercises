import DisplayPersons from "./components/DisplayPersons";
import { Container } from "@mui/material";
import "./App.css";
function App() {
  return (
    <div className="app">
      <Container>
        <DisplayPersons />
      </Container>
    </div>
  );
}

export default App;
