import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { TextField, Button, Container } from "@mui/material";

import queries from "../queries/queries";

const UpdatePhone = ({ setError }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [changeNumber, result] = useMutation(queries.EDIT_NUMBER);

  const handleSubmit = (event) => {
    event.preventDefault();

    changeNumber({ variables: { name, phone } });

    setName("");
    setPhone("");
  };

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      setError("Person not found");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data]);

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center" }}>
      <h2>Change Number</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <TextField
          label="Phone"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />

        <Button variant="contained" type="submit">
          Change Number
        </Button>
      </form>
    </Container>
  );
};

export default UpdatePhone;
