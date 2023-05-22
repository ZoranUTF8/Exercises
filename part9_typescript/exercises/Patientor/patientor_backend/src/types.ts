export type Gender = "male" | "female" | "other";

export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

// ? Omit the ssn from the patient
export type NonSensitivePatientData = Omit<Patient, "ssn">;
