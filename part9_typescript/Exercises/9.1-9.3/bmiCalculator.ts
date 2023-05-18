const calculateBmi = (height: number, weight: number): object => {
  // Convert height to meters
  const heightInMeters = height / 100;

  // Calculate BMI
  const bmi = weight / (heightInMeters * heightInMeters);

  const result = {
    weight: `${weight} kg`,
    height: `${heightInMeters} cm.`,
    bmi: "",
  };

  switch (true) {
    case bmi < 18.5:
      result.bmi = "Underweight";
      break;
    case bmi >= 18.5 && bmi < 25:
      result.bmi = "Normal weight";
      break;
    case bmi >= 25 && bmi < 30:
      result.bmi = "Overweight";
      break;
    case bmi >= 30 && bmi < 35:
      result.bmi = "Obesity (Class 1)";
      break;
    case bmi >= 35 && bmi < 40:
      result.bmi = "Obesity (Class 2)";
      break;
    case bmi >= 40:
      result.bmi = "Extreme obesity (Class 3)";
      break;
    default:
      result.bmi = "Invalid BMI value";
      break;
  }

  return result;
};

export default calculateBmi;

// ? Command line usage
// const height: number = Number(process.argv[2]);
// const weight: number = Number(process.argv[3]);
// const result = calculateBmi(height, weight);
// console.log(
//   `The result for height ${height} and weight ${weight} is: ${result}`
// );
