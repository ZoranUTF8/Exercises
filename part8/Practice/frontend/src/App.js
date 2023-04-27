import DisplayPersons from "./components/DisplayPersons";
import { Container } from "@mui/material";
import "./App.css";
function App() {
  return (
    <div className="app">
      <Container sx={{ py: 5 }}>
        <DisplayPersons />
      </Container>
    </div>
  );
}

export default App;
