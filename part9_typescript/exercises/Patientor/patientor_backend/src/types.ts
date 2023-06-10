export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export enum StayType {
  "HealthCheck" = "HealthCheck",
  "Hospital" = "Hospital",
  "OccupationalHealthcare" = "OccupationalHealthcare",
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnoses["code"]>;
}

interface HealthCheckEntry extends BaseEntry {
  type: StayType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
  type: StayType.Hospital;
  discharge: {
    date: string;
    criteria: string;
  };
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: StayType.OccupationalHealthcare;
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries?: Entry[]; // Make entries property optional with a default value
}

export type NewPatientEntry = Omit<Patient, "id">;

// ? Omit the ssn from the patient
export type NonSensitivePatientData = Omit<Patient, "ssn" | "entries">;

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;
