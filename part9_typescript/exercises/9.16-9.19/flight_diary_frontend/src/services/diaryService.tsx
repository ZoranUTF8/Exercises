import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from "../types/Diary";

const baseUrl = 'http://localhost:3001/api/diaries'

export const getAllDiaryEntries = () => {
    return axios
        .get<DiaryEntry[]>(baseUrl)
        .then(response => response.data)
}

export const createDiary = (object: NewDiaryEntry) => {
    return axios
        .post<DiaryEntry>(baseUrl, object)
        .then(response => response.data)
}