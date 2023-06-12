import {
  NewPatientEntry,
  Gender,
  StayType,
  HealthCheckRating,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  NewDiagnosisEntry,
  Diagnoses,
} from "../src/types";

/*
unknown is the ideal type for our kind of situation of input 
validation, since we don't yet need to define the type to match
any type, but can first verify the type and then confirm the 
expected type. 
*/

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatientEntry: NewPatientEntry = {
      name: parseTextData(object.name),
      dateOfBirth: parseTextData(object.dateOfBirth),
      ssn: parseTextData(object.ssn),
      occupation: parseTextData(object.occupation),
      gender: parseGender(object.gender),
    };

    return newPatientEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};

// * Helper functions

/*
The function is a so-called type guard. That means it is a function 
that returns a boolean and has a type predicate as the return type. 
In our case, the type predicate is:

text is string

The general form of a type predicate is parameterName is Type where 
the parameterName is the name of the function parameter and Type is 
the targeted type.

If the type guard function returns true, the TypeScript compiler 
knows that the tested variable has the type that was defined in 
the type predicate.
 */

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseTextData = (textData: unknown): string => {
  if (!isString(textData)) {
    throw new Error("Incorrect or missing comment");
  }
  return textData;
};

const isGender = (textData: string): textData is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(textData);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing visibility: " + gender);
  }
  return gender;
};

// const isDate = (date: string): boolean => {
//   return Boolean(Date.parse(date));
// };

// const parseDate = (date: unknown): string => {
//   if (!isString(date) || !isDate(date)) {
//     throw new Error("Incorrect or missing date: " + date);
//   }
//   return date;
// };

// const isWeather = (param: string): param is Weather => {
//   return Object.values(Weather)
//     .map((v) => v.toString())
//     .includes(param);
// };

// const parseWeather = (weather: unknown): Weather => {
//   if (!isString(weather) || !isWeather(weather)) {
//     throw new Error("Incorrect or missing weather: " + weather);
//   }
//   return weather;
// };

// const isVisibility = (param: string): param is Visibility => {
//   return Object.values(Visibility)
//     .map((v) => v.toString())
//     .includes(param);
// };

// const parseVisibility = (visibility: unknown): Visibility => {
//   if (!isString(visibility) || !isVisibility(visibility)) {
//     throw new Error("Incorrect or missing visibility: " + visibility);
//   }
//   return visibility;
// };

// Function to validate the required fields for each entry type
const toNewDiagnosisEntry = (object: unknown): NewDiagnosisEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "type" in object &&
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "diagnosisCodes" in object
  ) {
    const entryType: StayType = parseStayType(object.type);

    switch (entryType) {
      case StayType.HealthCheck:
        if ("healthCheckRating" in object) {
          const newHealthCheckEntry: HealthCheckEntry = {
            type: entryType,
            description: parseTextData(object.description),
            date: parseTextData(object.date),
            specialist: parseTextData(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
          };
          return newHealthCheckEntry;
        }
        break;

      case StayType.Hospital:
        if (
          "discharge" in object &&
          object.discharge !== null &&
          typeof object.discharge === "object" &&
          "date" in object.discharge &&
          "criteria" in object.discharge
        ) {
          const dischargeDate = parseTextData(object.discharge.date);
          const dischargeCriteria = parseTextData(object.discharge.criteria);

          if (dischargeDate && dischargeCriteria) {
            const newHospitalEntry: HospitalEntry = {
              type: entryType,
              description: parseTextData(object.description),
              date: parseTextData(object.date),
              specialist: parseTextData(object.specialist),
              diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
              discharge: {
                date: dischargeDate,
                criteria: dischargeCriteria,
              },
            };
            return newHospitalEntry;
          }
        }
        break;

      case StayType.OccupationalHealthcare:
        if ("employerName" in object && "sickLeave" in object) {
          const newOccupationalHealthcareEntry: OccupationalHealthcareEntry = {
            type: entryType,
            description: parseTextData(object.description),
            date: parseTextData(object.date),
            specialist: parseTextData(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
            employerName: parseTextData(object.employerName),
            sickLeave: parseSickLeave(object.sickLeave),
          };
          return newOccupationalHealthcareEntry;
        }
        break;

      default:
        break;
    }
  }

  throw new Error("Incorrect data: some fields are missing or invalid");
};

function parseDiagnosisCodes(
  diagnosisCodes: unknown
): Array<Diagnoses["code"]> | undefined {
  if (
    !diagnosisCodes ||
    !Array.isArray(diagnosisCodes) ||
    !diagnosisCodes.every((code) => typeof code === "string")
  ) {
    return undefined;
  }

  return diagnosisCodes as Array<Diagnoses["code"]>;
}

function parseStayType(type: unknown): StayType {
  if (
    typeof type !== "string" ||
    !Object.values(StayType).includes(type as StayType)
  ) {
    throw new Error("Invalid or missing diagnosis code type");
  }

  return type as StayType;
}

function parseHealthCheckRating(rating: unknown): HealthCheckRating {
  if (
    typeof rating !== "number" ||
    !Object.values(HealthCheckRating).includes(rating as HealthCheckRating)
  ) {
    throw new Error("Invalid or missing health check rating");
  }

  return rating as HealthCheckRating;
}

function parseSickLeave(
  sickLeave: unknown
): OccupationalHealthcareEntry["sickLeave"] | undefined {
  if (
    sickLeave &&
    typeof sickLeave === "object" &&
    "startDate" in sickLeave &&
    "endDate" in sickLeave
  ) {
    const startDate = parseTextData(sickLeave.startDate);
    const endDate = parseTextData(sickLeave.endDate);

    if (startDate && endDate) {
      return { startDate, endDate };
    }
  }

  return undefined;
}

export default { toNewPatientEntry, toNewDiagnosisEntry };
