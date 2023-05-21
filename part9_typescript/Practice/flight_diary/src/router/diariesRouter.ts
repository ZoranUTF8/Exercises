import express from "express";
import diaryService from "../services/diaryService";
const diariesRouter = express.Router();

diariesRouter.get("/", (_req, res) => {
  res.send(diaryService.getEntries());
});

diariesRouter.post("/", (_req, res) => {
  res.send("Saving a diary!");
});

export default diariesRouter;
