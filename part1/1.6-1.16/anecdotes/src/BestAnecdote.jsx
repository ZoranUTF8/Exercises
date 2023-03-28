import React from "react";

const BestAnecdote = ({ anecdotes }) => {
  const BestUpvoteCount = 0;

  const highestPoint = anecdotes.reduce(
    (prev, current) => {
      return prev.upVote > current.upVote ? prev : current;
    },
    { point: -Infinity }
  );

  return (
    <div>
      BestAnecdote: {highestPoint.joke} with {highestPoint.upVote} upvotes.{" "}
    </div>
  );
};

export default BestAnecdote;
