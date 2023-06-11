import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Patient, Diagnoses } from "./types";

import patientService from "./services/patientsService";
import diagnosesService from "./services/diagnosesService";
import PatientListPage from "./components/PatientListPage";
import SinglePatientDetailsPage from "./components/SinglePatientDetails"

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnoses[]>([]);


  useEffect(() => {


    const fetchPatientListAndAllDiagnoses = async () => {
      try {
        const [patientData, diagnosesData] = await Promise.all([
          patientService.getAll(),
          diagnosesService.getAll(),
        ]);

        setPatients(patientData);
        setDiagnoses(diagnosesData);
      } catch (error) {
        console.error('Error fetching patient data and diagnoses:', error);
      }
    };

    void fetchPatientListAndAllDiagnoses();
  }, []);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/patient/:id" element={<SinglePatientDetailsPage diagnosesData={diagnoses} />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
