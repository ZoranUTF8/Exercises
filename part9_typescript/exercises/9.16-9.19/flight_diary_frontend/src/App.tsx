import { ChangeEvent, useEffect, useState } from 'react';
import { getAllDiaryEntries, createDiary } from "./services/diaryService"
import { DiaryEntry, NewDiaryEntry, Weather, Visibility } from './types/Diary';
import './App.css';

function App() {
  const [error, setError] = useState("")
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
    if (!newDiary.date || !newDiary.weather || !newDiary.visibility) {
      setError('Please fill in all fields');
      setTimeout(() => { setError("") }, 3000)
      return;
    }

    createDiary(newDiary)
      .then(data => {
        if (data) {
          setDiaries(diaries.concat(data));
          setNewDiary({
            date: '',
            weather: Weather.Sunny,
            visibility: Visibility.Good,
            comment: '',
          });
        } else {
          // Handle the case where data is undefined
          console.error('Data is undefined');
        }
      })
      .catch(error => {

        setError(error.message);
        setTimeout(() => {
          setError('');
        }, 3000);
      });

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
      {error && <h1 className='error'>{error}</h1>}
      <header className="App-header">
        <ul>        {diaries.map((diaryEntry) => <li key={diaryEntry.id}><h1 >{diaryEntry.date}</h1><h3>Visibility:{diaryEntry.visibility}</h3><h3>Weather:{diaryEntry.weather}</h3><h3>{diaryEntry.comment && `Comment:${diaryEntry.comment}`}</h3></li>)}
        </ul>
      </header>
      <main>
        <form onSubmit={addNewDiary}>
          <input
            type="date"
            name="date"
            value={newDiary.date}
            onChange={handleInputChange}
            placeholder="Date"
          />
          <div>
            {Object.values(Weather).map((weatherOption) => (
              <label key={weatherOption}>
                <input
                  type="radio"
                  name="weather"
                  value={weatherOption}
                  checked={newDiary.weather === weatherOption}
                  onChange={handleInputChange}
                />
                {weatherOption}
              </label>
            ))}
          </div>
          <div>
            {Object.values(Visibility).map((visibilityOption) => (
              <label key={visibilityOption}>
                <input
                  type="radio"
                  name="visibility"
                  value={visibilityOption}
                  checked={newDiary.visibility === visibilityOption}
                  onChange={handleInputChange}
                />
                {visibilityOption}
              </label>
            ))}
          </div>
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
