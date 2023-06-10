import express from "express";
import patientsService from "../services/patientsService";
import requestToTyped from "../../utils/requestToTyped";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
  res.send(patientsService.getAllPatientsNonSensitiveData());
});

patientsRouter.get("/:id", (req, res) => {
  res.send(patientsService.getSinglePatient(req.params.id));
});

patientsRouter.post("/", (req, res) => {
  try {
    const newPatientEntry = requestToTyped.toNewPatientEntry(req.body);

    const addedEntry = patientsService.addNewPatient(newPatientEntry);

    res.json(addedEntry);
  } catch (error) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});
export default patientsRouter;
