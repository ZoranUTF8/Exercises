import diaryData from "../../demoData/diaryData";
import { DiaryEntry, NonSensitiveDiaryEntry, NewDiaryEntry } from "../types";

const diaries: DiaryEntry[] = diaryData;

const getEntries = () => {
  return diaries;
};

// ? Add a new diary entry
const addDiary = (newEntry: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map((d) => d.id)) + 1,
    ...newEntry,
  };



  diaries.push(newDiaryEntry);
  console.log(diaries);
  return newDiaryEntry;
};

// ? Find diary by id
const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find((d) => d.id === id);
  return entry;
};

// ? Pick which object fields to return
const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ date, weather, visibility }) => ({
    date,
    weather,
    visibility,
  }));
};

// ? Get all the data for the entires
const getSensitiveEntriesData = (): DiaryEntry[] => {
  return diaries;
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  getSensitiveEntriesData,
  findById,
};
