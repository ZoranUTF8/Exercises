import React from "react";
import { Button, Paper, Typography } from "@mui/material";

const SinglePerson = ({ person, onClose }) => {
  return (
    <Paper sx={{ p: 2, textAlign: "center" }}>
      <Typography variant="h5" gutterBottom>
        {person.name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {person.address.street}, {person.address.city}
      </Typography>
      <Typography variant="body2" gutterBottom>
        {person.phone}
      </Typography>
      <Button variant="contained" onClick={onClose}>
        Close
      </Button>
    </Paper>
  );
};

export default SinglePerson;
