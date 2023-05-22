import express from "express";
import diagnosisRouter from "./router/diagnosisRouter";
import patientsRouter from "./router/patientsRouter";
import cors from "cors";

const app = express();
// Enable CORS middleware
app.use(cors());

app.use(express.json());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diagnoses", diagnosisRouter);
app.use("/api/patients", patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
