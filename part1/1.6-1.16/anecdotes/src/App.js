import { useState } from "react";
import BestAnecdote from "./BestAnecdote";
import "./anecdotes.css";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      id: 0,
      joke: "If it hurts, do it more often.",
      upVote: 0,
      downVote: 0,
    },
    {
      id: 1,
      joke: "Adding manpower to a late software project makes it later!",
      upVote: 0,
      downVote: 0,
    },
    {
      id: 2,
      joke: "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
      upVote: 0,
      downVote: 0,
    },
    {
      id: 3,
      joke: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      upVote: 0,
      downVote: 0,
    },
    {
      id: 4,
      joke: "Premature optimization is the root of all evil.",
      upVote: 0,
      downVote: 0,
    },

    {
      id: 5,
      joke: "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
      upVote: 0,
      downVote: 0,
    },
    {
      id: 6,
      joke: "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
      upVote: 0,
      downVote: 0,
    },
    {
      id: 7,
      joke: "The only way to go fast, is to go well.",
      upVote: 0,
      downVote: 0,
    },
  ]);

  const [selected, setSelected] = useState(0);

  const getAnecdote = () => {
    const randomNum = Math.floor(Math.random() * anecdotes.length);
    setSelected((prevValue) => (prevValue = randomNum));
  };

  const handleVote = (option, selectedId) => {
    switch (option) {
      case "plus":
        const upvotedAnecdotes = anecdotes.map((anecdote) => {
          if (anecdote.id === selectedId) {
            return { ...anecdote, upVote: (anecdote.upVote += 1) };
          }
          return anecdote;
        });

        setAnecdotes(upvotedAnecdotes);

        break;
      case "minus":
        const downvotedAnecdotes = anecdotes.map((anecdote) => {
          if (anecdote.id === selectedId) {
            return { ...anecdote, downVote: (anecdote.downVote -= 1) };
          }
          return anecdote;
        });

        setAnecdotes(downvotedAnecdotes);

        break;
      default:
        break;
    }
  };

  return (
    <div className="App">
      <div className="anecdoteContainer">
        <h1>{anecdotes[selected].joke}</h1>
        <div className="votes-button-container">
          <button onClick={() => handleVote("plus", anecdotes[selected].id)}>
            +
          </button>
          <button onClick={() => handleVote("minus", anecdotes[selected].id)}>
            -
          </button>
        </div>
        <div className="votes-container">
          <h1>
            Upvotes:
            {anecdotes[selected].upVote ? anecdotes[selected].upVote : 0}
          </h1>
          <h1>
            Downvotes:
            {anecdotes[selected].downVote ? anecdotes[selected].downVote : 0}
          </h1>
        </div>
      </div>
      <div className="button-container">
        <button onClick={getAnecdote}>Next Anecdote</button>
      </div>
      <div className="bestAnecdote">
        <BestAnecdote anecdotes={anecdotes} />
      </div>
    </div>
  );
};

export default App;