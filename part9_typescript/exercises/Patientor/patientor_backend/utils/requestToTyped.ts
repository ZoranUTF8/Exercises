import { NewPatientEntry, Gender } from "../src/types";

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
export default { toNewPatientEntry };
