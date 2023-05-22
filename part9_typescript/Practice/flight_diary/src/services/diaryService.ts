import diaryData from "../../demoData/diaryData";
import { DiaryEntry, NonSensitiveDiaryEntry } from "../types";

const diaries: DiaryEntry[] = diaryData;

const getEntries = () => {
  return diaries;
};

const addDiary = () => {
  return null;
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
};
