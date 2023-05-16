const calculateBmi = (height: number, weight: number): string => {
  // Convert height to meters
  const heightInMeters = height / 100;

  // Calculate BMI
  const bmi = weight / (heightInMeters * heightInMeters);

  let result = "";

  switch (true) {
    case bmi < 18.5:
      result = "Underweight";
      break;
    case bmi >= 18.5 && bmi < 25:
      result = "Normal weight";
      break;
    case bmi >= 25 && bmi < 30:
      result = "Overweight";
      break;
    case bmi >= 30 && bmi < 35:
      result = "Obesity (Class 1)";
      break;
    case bmi >= 35 && bmi < 40:
      result = "Obesity (Class 2)";
      break;
    case bmi >= 40:
      result = "Extreme obesity (Class 3)";
      break;
    default:
      result = "Invalid BMI value";
  }

  return result;
};

console.log(calculateBmi(176, 74));
