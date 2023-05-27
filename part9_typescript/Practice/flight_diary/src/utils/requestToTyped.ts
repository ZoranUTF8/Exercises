import { NewDiaryEntry, Weather, Visibility } from "../types";

/*
unknown is the ideal type for our kind of situation of input 
validation, since we don't yet need to define the type to match
any type, but can first verify the type and then confirm the 
expected type. 
*/

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "comment" in object &&
    "date" in object &&
    "weather" in object &&
    "visibility" in object
  ) {
    const newEntry: NewDiaryEntry = {
      weather: parseWeather(object.weather),
      visibility: parseVisibility(object.visibility),
      date: parseDate(object.date),
      comment: parseComment(object.comment),
    };

    return newEntry;
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

const parseComment = (comment: unknown): string => {
  if (!isString(comment)) {
    throw new Error("Incorrect or missing comment");
  }
  return comment;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const isWeather = (param: string): param is Weather => {
  return Object.values(Weather)
    .map((v) => v.toString())
    .includes(param);
};

const parseWeather = (weather: unknown): Weather => {
  if (!isString(weather) || !isWeather(weather)) {
    throw new Error("Incorrect or missing weather: " + weather);
  }
  return weather;
};

const isVisibility = (param: string): param is Visibility => {
  return Object.values(Visibility)
    .map((v) => v.toString())
    .includes(param);
};

const parseVisibility = (visibility: unknown): Visibility => {
  if (!isString(visibility) || !isVisibility(visibility)) {
    throw new Error("Incorrect or missing visibility: " + visibility);
  }
  return visibility;
};
export default { toNewDiaryEntry };
