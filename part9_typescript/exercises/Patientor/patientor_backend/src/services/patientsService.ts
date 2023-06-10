import patients from "../demoData/patients";
import { v4 as uuidv4 } from "uuid";

import { Patient, NonSensitivePatientData, NewPatientEntry } from "../types";
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
  return allPatients;
};

const addNewPatient = (newPatient: NewPatientEntry): Patient => {
  let myuuid = uuidv4();

  const newPatientEntry = {
    id: myuuid,
    ...newPatient,
  };

  allPatients.push(newPatientEntry);
  return newPatientEntry;
};

const getSinglePatient = (patientId: string): Patient | undefined => {
  const parsedPatientId = parseInt(patientId);

  const foundPatient: Patient | undefined = allPatients.find(
    (p) => p.id === parsedPatientId
  );

  console.log(foundPatient);
  return foundPatient;
};

export default {
  getAllPatientsNonSensitiveData,
  getAllPatientsSensitiveData,
  addNewPatient,
  getSinglePatient,
};
