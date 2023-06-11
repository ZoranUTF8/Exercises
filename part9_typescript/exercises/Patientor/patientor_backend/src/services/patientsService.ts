import patients from "../demoData/patients";
import requestToTyped from "../../utils/requestToTyped";

import {
  Patient,
  NonSensitivePatientData,
  NewPatientEntry,
  Entry,
  StayType,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
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
  patientEntryData: Entry
): Entry => {
  const { type, ...entryData } = patientEntryData;

  let newEntry: Entry | undefined;

  switch (type) {
    case StayType.HealthCheck:
      const healthCheckEntry: HealthCheckEntry = {
        type: StayType.HealthCheck,
        ...entryData,
        healthCheckRating: patientEntryData.healthCheckRating,
      };
      newEntry = healthCheckEntry;
      break;

    case StayType.Hospital:
      const hospitalEntry: HospitalEntry = {
        type: StayType.Hospital,
        ...entryData,
        discharge: patientEntryData.discharge,
      };
      newEntry = hospitalEntry;
      break;

    case StayType.OccupationalHealthcare:
      const occupationalHealthcareEntry: OccupationalHealthcareEntry = {
        type: StayType.OccupationalHealthcare,
        ...entryData,
        employerName: patientEntryData.employerName,
        sickLeave: patientEntryData.sickLeave,
      };
      newEntry = occupationalHealthcareEntry;
      break;
  }

  // Check if all required fields are provided for the entry type
  if (!requestToTyped.validateEntryFields(newEntry)) {
    throw new Error("Missing required fields for the entry type");
  }

  // Find the patient with the specified ID
  const patientIndex = allPatients.findIndex((p) => p.id === patientId);
  if (patientIndex === -1) {
    throw new Error("Patient not found");
  }

  // Add the new entry to the patient's entries array
  const patient = allPatients[patientIndex];
  if (!patient.entries) {
    patient.entries = []; // Initialize entries array if it's undefined
  }
  patient.entries.push(newEntry);

  return newEntry;
};

export default {
  getAllPatientsNonSensitiveData,
  getAllPatientsSensitiveData,
  addNewPatient,
  getSinglePatient,
  addNewDiagnosisEntry,
};
