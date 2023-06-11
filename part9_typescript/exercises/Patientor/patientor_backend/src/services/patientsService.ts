import patients from "../demoData/patients";
import { Patient, NonSensitivePatientData, NewPatientEntry } from "../types";
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
  return allPatients;
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

export default {
  getAllPatientsNonSensitiveData,
  getAllPatientsSensitiveData,
  addNewPatient,
  getSinglePatient,
};
