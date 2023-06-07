import axios, { AxiosError } from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types/Diary";

const baseUrl = 'http://localhost:3001/api/diaries'

export const getAllDiaryEntries = () => {
    return axios
        .get<DiaryEntry[]>(baseUrl)
        .then(response => response.data)
}

export const createDiary = async (object: NewDiaryEntry) => {
    try {
        const response = await axios.post<DiaryEntry>(baseUrl, object);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.message);
        }
    }
};