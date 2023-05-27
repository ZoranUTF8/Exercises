import patients from "../demoData/patients";
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
  
  const newPatientEntry = {
    id: Math.max(...allPatients.map((d) => d.id)) + 1,
    ...newPatient,
  };

  allPatients.push(newPatientEntry);
  console.log(`ALL PATIENTS: `, allPatients);
  return newPatientEntry;
};

export default {
  getAllPatientsNonSensitiveData,
  getAllPatientsSensitiveData,
  addNewPatient,
};
