import React from "react";
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

const TableDisplay = ({ dataToDisplay, type }) => {
  return (
    <Container>
      <TableContainer component={Paper} elevation={3}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">
                {type === "authors" ? "Born" : "Author"}
              </TableCell>
              <TableCell align="center">
                {type === "authors" ? "Book count" : "Published"}
              </TableCell>
              {type === "books" && (
                <TableCell align="center">"Genres"</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataToDisplay.map((row) => (
              <TableRow key={row.id} className="MuiTableRow-hover">
                <TableCell component="th" scope="row">
                  {type === "authors" ? row.name : row.title}
                </TableCell>
                <TableCell component="th" scope="row">
                  {type === "authors"
                    ? row.born
                      ? row.born
                      : "No born year provided."
                    : row.author.name}
                </TableCell>
                <TableCell align="center">
                  {type === "authors"
                    ? row.bookCount
                      ? row.bookCount
                      : "No books."
                    : row.published}
                </TableCell>
                {type === "books" && (
                  <TableCell>
                    {row.genres.map((genre, ind) => (
                      <span key={ind}>{genre} </span>
                    ))}
                  </TableCell>
                )}
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    size="small"
                    // onClick={() => setNameToSearch(row.name)}
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TableDisplay;
