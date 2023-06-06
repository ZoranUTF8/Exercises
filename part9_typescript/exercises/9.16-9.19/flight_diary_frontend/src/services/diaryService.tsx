import axios from 'axios';
import { DiaryEntry } from "../types/Diary";

const baseUrl = 'http://localhost:3001/api/diaries'

export const getAllDiaryEntries = () => {
    return axios
        .get<DiaryEntry[]>(baseUrl)
        .then(response => response.data)
}

// export const createNote = (object: NewNote) => {
//     return axios
//         .post<Note>(baseUrl, object)
//         .then(response => response.data)
// }