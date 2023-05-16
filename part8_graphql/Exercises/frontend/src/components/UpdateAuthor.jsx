import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useMutation, useQuery } from "@apollo/client";
import queries from "../queries/queries";
import { toast } from "react-toastify";
import Select from "react-select";

const UpdateAuthor = () => {
  const [allAuthors, setAllAuthors] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const result = useQuery(queries.ALL_AUTHORS);

  const [updateAuthorBorn] = useMutation(queries.UPDATE_AUTHOR_BORN, {
    refetchQueries: [{ query: queries.ALL_AUTHORS }],
    onError: (error) => {
      toast.error(error.message);
    },
    onCompleted: () => {
      toast.success("Author born updated successfully!");
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    updateAuthorBorn({
      variables: {
        name,
        born: parseInt(age),
      },
    });

    setName("");
    setAge("");
  };

  useEffect(() => {
    if (result.data) {
      setAllAuthors(result.data.allAuthors);
    }
  }, [result.data]);

  if (result.loading) {
    return <div>Getting authors data...</div>;
  }

  return (
    <Container sx={{ marginTop: "2rem" }}>
      <form onSubmit={handleSubmit}>
        <p>Author:</p>
        <Select
          options={allAuthors.map((author) => ({
            value: author.name,
            label: author.name,
          }))}
          value={{ value: name, label: name }}
          onChange={(selectedOption) => setName(selectedOption.value)}
        />

        <TextField
          label="Born"
          variant="outlined"
          type="number"
          value={age}
          onChange={(event) => setAge(event.target.value)}
          margin="normal"
          fullWidth
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default UpdateAuthor;
