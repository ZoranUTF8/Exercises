import { ChangeEvent, useEffect, useState } from 'react';
import { getAllDiaryEntries, createDiary } from "./services/diaryService"
import { DiaryEntry, NewDiaryEntry, Weather, Visibility } from './types/Diary';
import './App.css';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [newDiary, setNewDiary] = useState<NewDiaryEntry>({
    date: "",
    weather: Weather.Sunny,
    visibility: Visibility.Good,
    comment: ""
  });

  useEffect(() => { getAllDiaryEntries().then(data => { setDiaries(data) }) }, [])

  const addNewDiary = (event: React.SyntheticEvent) => {
    event.preventDefault()

    // Check if any fields are missing
    if (!newDiary.date || !newDiary.weather || !newDiary.visibility || !newDiary.comment) {
      alert('Please fill in all fields');
      return;
    }

    createDiary(newDiary).then(data => { setDiaries(diaries.concat(data)) })

  }
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewDiary((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setNewDiary((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };






  if (diaries.length === 0) return <h1>Loading...</h1>;

  return (
    <div className="App">
      <header className="App-header">
        <ul>        {diaries.map((diaryEntry) => <li><h1 key={diaryEntry.id}>{diaryEntry.date}</h1><h3>Visibility:{diaryEntry.visibility}</h3><h3>Weather:{diaryEntry.weather}</h3><h3>{diaryEntry.comment && `Comment:${diaryEntry.comment}`}</h3></li>)}
        </ul>
      </header>
      <main>
        <form onSubmit={addNewDiary}>
          <input
            type="text"
            name="date"
            value={newDiary.date}
            onChange={handleInputChange}
            placeholder="Date"
          />
          <select
            name="weather"
            value={newDiary.weather}
            onChange={handleSelectChange}
          >
            {Object.values(Weather).map((weatherOption) => (
              <option key={weatherOption} value={weatherOption}>
                {weatherOption}
              </option>
            ))}
          </select>
          <select
            name="visibility"
            value={newDiary.visibility}
            onChange={handleSelectChange}
          >
            {Object.values(Visibility).map((visibilityOption) => (
              <option key={visibilityOption} value={visibilityOption}>
                {visibilityOption}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="comment"
            value={newDiary.comment}
            onChange={handleInputChange}
            placeholder="Comment"
          />
          <button type="submit">Add Diary Entry</button>
        </form>
      </main>
    </div>
  );
}

export default App;
