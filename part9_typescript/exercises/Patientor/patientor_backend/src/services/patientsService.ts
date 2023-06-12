import patients from "../demoData/patients";

import {
  Patient,
  NonSensitivePatientData,
  NewPatientEntry,
  NewDiagnosisEntry,
} from "../types";
import { v4 as uuidv4 } from "uuid";

const allPatients: Patient[] = patients;

const getAllPatientsNonSensitiveData = (): NonSensitivePatientData[] => {
  return allPatients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getAllPatientsSensitiveData = (): Patient[] => {
  return allPatients.map((patient) => {
    const entries = patient.entries || []; // Initialize entries array if it's undefined
    return {
      ...patient,
      entries,
    };
  });
};

const addNewPatient = (newPatient: NewPatientEntry): Patient => {
  const newUUID: string = uuidv4();
  const newPatientEntry = {
    id: newUUID,
    ...newPatient,
  };

  allPatients.push(newPatientEntry);
  return newPatientEntry;
};

const getSinglePatient = (patientId: string): Patient | undefined => {
  const foundPatient: Patient | undefined = allPatients.find(
    (p) => p.id === patientId
  );
  return foundPatient;
};

const addNewDiagnosisEntry = (
  patientId: string,
  newEntry: NewDiagnosisEntry
): void => {
  const newUUID: string = uuidv4();

  const newPatientEntry = {
    id: newUUID,
    ...newEntry,
  };

  const patientIndex = patients.findIndex(
    (patient) => patient.id === patientId
  );
  if (patientIndex !== -1) {
    patients[patientIndex].entries = patients[patientIndex].entries || [];
    patients[patientIndex].entries.push(newPatientEntry);
    console.log(`Entry added for patient with id ${patientId}`);
    console.log(`New entry: `, newPatientEntry);
  } else {
    console.log(`Patient with id ${patientId} not found`);
  }
};

export default {
  getAllPatientsNonSensitiveData,
  getAllPatientsSensitiveData,
  addNewPatient,
  getSinglePatient,
  addNewDiagnosisEntry,
};
