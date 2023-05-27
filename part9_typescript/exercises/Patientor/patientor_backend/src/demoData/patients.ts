import { Patient } from "../types";
import requestToTyped from "../../utils/requestToTyped";

const data = [
  {
    id: 1,
    name: "John McClane",
    dateOfBirth: "1986-07-09",
    ssn: "090786-122X",
    gender: "male",
    occupation: "Teacher",
  },
  {
    id: 2,
    name: "Martin Riggs",
    dateOfBirth: "1979-01-30",
    ssn: "300179-77A",
    gender: "male",
    occupation: "Cop",
  },
  {
    id: 3,
    name: "Hans Gruber",
    dateOfBirth: "1970-04-25",
    ssn: "250470-555L",
    gender: "other",
    occupation: "Technician",
  },
  {
    id: 4,
    name: "Dana Scully",
    dateOfBirth: "1974-01-05",
    ssn: "050174-432N",
    gender: "female",
    occupation: "Forensic Pathologist",
  },
  {
    id: 5,
    name: "Matti Luukkainen",
    dateOfBirth: "1971-04-09",
    ssn: "090471-8890",
    gender: "male",
    occupation: "Digital evangelist",
  },
];

const patientEntries: Patient[] = data.map((obj) => {
  const object = requestToTyped.toNewPatientEntry(obj) as Patient;
  object.id = obj.id;
  return object;
});

export default patientEntries;
