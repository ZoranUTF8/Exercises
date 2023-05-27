import express from "express";
import diaryService from "../services/diaryService";
import requestToTyped from "../utils/requestToTyped";
const diariesRouter = express.Router();

// ? Get non sensitive information
diariesRouter.get("/nonSensitiveData", (_req, res) => {
  res.send(diaryService.getNonSensitiveEntries());
});

// ? Get sensitive information
diariesRouter.get("/sensitiveData", (_req, res) => {
  res.send(diaryService.getSensitiveEntriesData());
});

// ? Get single diary on provided id
diariesRouter.get("/:id", (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));
  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404).json({ message: `No diary with id ${req.params.id}` });
  }
});

// ? Add a new diary
diariesRouter.post("/", (req, res) => {
  try {
    const newDiaryEntry = requestToTyped.toNewDiaryEntry(req.body);
    const addedEntry = diaryService.addDiary(newDiaryEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default diariesRouter;
