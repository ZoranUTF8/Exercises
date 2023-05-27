export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type NewPatientEntry = Omit<Patient, "id">;

export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: number;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

// ? Omit the ssn from the patient
export type NonSensitivePatientData = Omit<Patient, "ssn">;
