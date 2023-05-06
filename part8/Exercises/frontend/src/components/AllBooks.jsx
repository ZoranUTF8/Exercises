import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client"; // ? The useQuery hook is well-suited for situations where the query is done when the component is rendered.
import queries from "../queries/queries";
import TableDisplay from "./TableDisplay";
const AllBooks = () => {
  const [allBooks, setAllBooks] = useState([]);
  const result = useQuery(queries.ALL_BOOKS);

  useEffect(() => {
    if (result.data) {
      setAllBooks(result.data.allBooks);
    }
  }, [result.data]);

  if (result.loading) {
    return <h1>Loading data...</h1>;
  }

  return (
    <div>
      <h1>AllBooks</h1>
      <TableDisplay dataToDisplay={allBooks} type={"books"} />
    </div>
  );
};

export default AllBooks;
