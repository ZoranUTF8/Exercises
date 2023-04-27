import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

import { Container, TextField, Button } from "@mui/material";

const CREATE_PERSON = gql`
  mutation createPerson(
    $name: String!
    $street: String!
    $city: String!
    $phone: String
  ) {
    addPerson(name: $name, street: $street, city: $city, phone: $phone) {
      name
      phone
      id
      address {
        street
        city
      }
    }
  }
`;
const AddPerson = () => {
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

  const [createPerson] = useMutation(CREATE_PERSON);

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
