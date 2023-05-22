import express from "express";
import diaryService from "../services/diaryService";
const diariesRouter = express.Router();

diariesRouter.get("/nonSensitiveData", (_req, res) => {
  res.send(diaryService.getNonSensitiveEntries());
});

diariesRouter.get("/sensitiveData", (_req, res) => {
  res.send(diaryService.getSensitiveEntriesData());
});

diariesRouter.post("/", (_req, res) => {
  res.send("Saving a diary!");
});

export default diariesRouter;
