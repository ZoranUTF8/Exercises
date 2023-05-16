import { useState } from "react";
import { useMutation } from "@apollo/client";
import queries from "../queries/queries";

import { Container, TextField, Button } from "@mui/material";

const AddPerson = ({ setError }) => {
  const [personData, setPersonData] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
  });

  const onValueChange = (e) => {
    const { value, name } = e.target;

    setPersonData((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  const [createPerson] = useMutation(queries.CREATE_PERSON, {
    refetchQueries: [{ query: queries.ALL_PERSONS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  const submit = (event) => {
    event.preventDefault();

    const { name, phone, street, city } = personData;

    createPerson({ variables: { name, phone, street, city } });

    setPersonData({
      name: "",
      phone: "",
      street: "",
      city: "",
    });
  };
  return (
    <Container maxWidth="sm" sx={{ textAlign: "center" }}>
      <h2>Add new person</h2>
      <form onSubmit={submit}>
        <div>
          <TextField
            label="Name"
            variant="outlined"
            size="small"
            name="name"
            required
            value={personData.name}
            onChange={(e) => {
              onValueChange(e);
            }}
          />
        </div>
        <div>
          <TextField
            label="Phone Number"
            variant="outlined"
            size="small"
            required
            name="phone"
            value={personData.phone}
            onChange={(e) => {
              onValueChange(e);
            }}
          />
        </div>
        <div>
          <TextField
            label="Street"
            variant="outlined"
            size="small"
            name="street"
            required
            value={personData.street}
            onChange={(e) => {
              onValueChange(e);
            }}
          />
        </div>
        <div>
          <TextField
            label="City"
            variant="outlined"
            size="small"
            required
            name="city"
            value={personData.city}
            onChange={(e) => {
              onValueChange(e);
            }}
          />
        </div>
        <Button type="submit" variant="contained" sx={{ mt: 1 }}>
          Add
        </Button>
      </form>
    </Container>
  );
};

export default AddPerson;
