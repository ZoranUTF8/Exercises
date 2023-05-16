import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client"; // ? The useQuery hook is well-suited for situations where the query is done when the component is rendered.
import queries from "../queries/queries";
import TableDisplay from "./TableDisplay";

const genresList = [
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Romance",
  "Thriller",
  "Horror",
  "Historical Fiction",
  "Young Adult",
];

const AllBooks = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  const genreFilter = selectedGenre ? { genre: selectedGenre } : {};

  const { loading, data, refetch } = useQuery(queries.ALL_BOOKS, {
    variables: genreFilter,
  });

  const handleGenreSelect = (event) => {
    setSelectedGenre(event.target.value);
  };

  useEffect(() => {
    if (data) {
      setAllBooks(data.allBooks);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [selectedGenre, refetch]);

  if (loading) {
    return <h1>Loading data...</h1>;
  }

  return (
    <div>
      <h1>AllBooks</h1>
      <div>
        <label htmlFor="genre-select">Select a genre:</label>
        <select
          id="genre-select"
          onChange={handleGenreSelect}
          value={selectedGenre || ""}
        >
          <option value="">All genres</option>
          {genresList.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      <TableDisplay dataToDisplay={allBooks} type={"books"} />
    </div>
  );
};

export default AllBooks;
