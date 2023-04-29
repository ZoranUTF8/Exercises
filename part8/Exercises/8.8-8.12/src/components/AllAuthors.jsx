import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client"; // ? The useQuery hook is well-suited for situations where the query is done when the component is rendered.
import queries from "../queries/queries";
import TableDisplay from "./TableDisplay";

const AllAuthors = () => {
  const [allAuthors, setAllAuthors] = useState([]);
  const [error, serError] = useState(null);

  const result = useQuery(queries.ALL_AUTHORS);

  useEffect(() => {
    if (result.data) {
      console.log(result.data.allAuthors);
      setAllAuthors(result.data.allAuthors);
    }
  }, [result.data]);

  if (result.loading) {
    return <div>Loading data...</div>;
  }

  return (
    <div>
      <h3>All authors</h3>
      <TableDisplay dataToDisplay={allAuthors} type={"authors"} />
    </div>
  );
};

export default AllAuthors;
