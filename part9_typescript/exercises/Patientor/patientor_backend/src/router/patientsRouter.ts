import express from "express";
import patientsService from "../services/patientsService";
import requestToTyped from "../../utils/requestToTyped";
import { Entry } from "../types";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
  res.send(patientsService.getAllPatientsNonSensitiveData());
});

patientsRouter.get("/sensitiveData", (_req, res) => {
  res.send(patientsService.getAllPatientsSensitiveData());
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
    let errorMessage = "Something went wrong adding the new patient.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

patientsRouter.post("/:id/entries", (req, res) => {
  try {
    const newDiagnosisEntry = patientsService.addNewDiagnosisEntry(
      req.params.id,
      req.body as Entry
    );

    res.json(newDiagnosisEntry);
  } catch (error) {
    let errorMessage = "Something went wrong adding the new patient.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});
export default patientsRouter;
