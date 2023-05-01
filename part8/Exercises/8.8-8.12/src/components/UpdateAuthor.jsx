import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useMutation } from "@apollo/client";
import queries from "../queries/queries";
import { toast } from "react-toastify";

const UpdateAuthor = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const [updateAuthorBorn] = useMutation(queries.UPDATE_AUTHOR_BORN, {
    refetchQueries: [{ query: queries.ALL_AUTHORS }],
    onError: (error) => {
      toast.error(error.message);
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

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        variant="outlined"
        value={name}
        onChange={(event) => setName(event.target.value)}
        margin="normal"
        fullWidth
      />
      <TextField
        label="Born"
        variant="outlined"
        type="number"
        value={age}
        onChange={(event) => setAge(event.target.value)}
        margin="normal"
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default UpdateAuthor;
