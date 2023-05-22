import patients from "../demoData/patients";
import { Patient, NonSensitivePatientData } from "../types";

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

export default { getAllPatientsNonSensitiveData, getAllPatientsSensitiveData };
