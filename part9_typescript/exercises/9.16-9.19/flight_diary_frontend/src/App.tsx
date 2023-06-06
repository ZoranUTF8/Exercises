import { useEffect, useState } from 'react';
import { getAllDiaryEntries } from "./services/diaryService"
import { DiaryEntry } from './types/Diary';
import './App.css';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  useEffect(() => { getAllDiaryEntries().then(data => { setDiaries(data) }) }, [])


  if (diaries.length === 0) return <h1>Loading...</h1>;

  return (
    <div className="App">
      <header className="App-header">

        {diaries.map((diaryEntry) => <h1 key={diaryEntry.id}>{diaryEntry.weather}</h1>)}

      </header>
    </div>
  );
}

export default App;
