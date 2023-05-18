interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const exerciseCalculator = (
  dailyExerciseHours: number[],
  targetAmountOfDailyhours: number
): ExerciseResult => {
  const averageExerciseTime =
    dailyExerciseHours.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    ) / dailyExerciseHours.length;

  const trainingDays = dailyExerciseHours.filter((day) => day > 0).length;

  const successResult =
    averageExerciseTime >= targetAmountOfDailyhours ? true : false;

  let exerciseRating;

  switch (trainingDays) {
    case 0:
      exerciseRating = 0;
      break;
    case 1:
      exerciseRating = 1;
      break;
    case 2:
      exerciseRating = 2;
      break;
    case 3:
      exerciseRating = 3;
      break;
    case 4:
      exerciseRating = 4;
      break;
    case 5:
      exerciseRating = 5;
      break;
    case 6:
      exerciseRating = 6;
      break;
    case 7:
      exerciseRating = 7;
      break;
    default:
      exerciseRating = -1;
      console.log("No such option");
      break;
  }

  let exerciseRatingDescription;
  switch (exerciseRating) {
    case 0:
      exerciseRatingDescription = "very bad.";
      break;
    case 1:
      exerciseRatingDescription = "keep going.";
      break;
    case 2:
      exerciseRatingDescription = "you are getting there slowly.";
      break;
    case 3:
      exerciseRatingDescription = "not too bad but could be better";
      break;
    case 4:
      exerciseRatingDescription = "getting better performance";
      break;
    case 5:
      exerciseRatingDescription = "going for the top";
      break;
    case 6:
      exerciseRatingDescription = "you are almost at the top";
      break;
    case 7:
      exerciseRatingDescription = "you are the top 1!";
      break;
    default:
      exerciseRatingDescription = "No such option";
      break;
  }

  return {
    periodLength: dailyExerciseHours.length,
    trainingDays: trainingDays,
    success: successResult,
    rating: exerciseRating,
    ratingDescription: exerciseRatingDescription,
    target: targetAmountOfDailyhours,
    average: averageExerciseTime,
  };
};

// const [target, ...numbers] = process.argv.slice(2).map(Number);
// const exerciseCalculatorResult = exerciseCalculator(numbers, target);

// console.log(exerciseCalculatorResult);
