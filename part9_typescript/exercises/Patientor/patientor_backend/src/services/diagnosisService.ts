import diagnoses from "../demoData/diagnoses";
import { Diagnoses } from "../types";

const allDiagnoses: Diagnoses[] = diagnoses;

const getAllDiagnoses = () => {
  return allDiagnoses;
};

export default { getAllDiagnoses };
