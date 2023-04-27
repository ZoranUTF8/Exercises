import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client"; // ? The useQuery hook is well-suited for situations where the query is done when the component is rendered.
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Button,
} from "@mui/material";
import SinglePerson from "./SinglePerson";
import AddPerson from "./AddPerson";

const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`;

const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
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

const DisplayPersons = () => {
  const [persons, setPersons] = useState([]);

  const result = useQuery(ALL_PERSONS);

  const [nameToSearch, setNameToSearch] = useState(null);
  const nameSearchResult = useQuery(FIND_PERSON, {
    variables: { nameToSearch },
    skip: !nameToSearch,
  });

  useEffect(() => {
    if (result.data) {
      setPersons(result.data.allPersons);
    }
  }, [result.data]);

  if (result.loading || nameSearchResult.loading) {
    return <div>loading data...</div>;
  }

  if (nameToSearch && nameSearchResult.data) {
    return (
      <SinglePerson
        person={nameSearchResult.data.findPerson}
        onClose={() => setNameToSearch(null)}
      />
    );
  }

  return (
    <Container style={{ textAlign: "center" }}>
      <TableContainer component={Paper} elevation={3}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Phone Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {persons.map((row) => (
              <TableRow key={row.id} className="MuiTableRow-hover">
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">
                  {row.phone ? row.phone : "No number"}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setNameToSearch(row.name)}
                  >
                    See Address
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddPerson />
    </Container>
  );
};

export default DisplayPersons;
