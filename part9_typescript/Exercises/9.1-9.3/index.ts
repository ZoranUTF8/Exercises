import express, { Request, Response } from "express";
import calculateBmi from "./bmiCalculator";
import { exerciseCalculator } from "./exerciseCalculator";

const app = express();
// Middleware to parse JSON bodies
app.use(express.json());

app.get("/hello", (_req: Request, res: Response) => {
  res.send("Hello Full Stack!");
});

// Endpoint for BMI calculator
app.get("/bmi", (req: Request, res: Response) => {
  const { height, weight } = req.query;

  // Check if height and weight are provided
  if (!height || !weight) {
    return res
      .status(400)
      .json({ error: "Please provide both height and weight." });
  }

  // Convert height and weight to numbers
  const heightInCm = Number(height);
  const weightInKg = Number(weight);

  // Check if height and weight are valid numbers
  if (isNaN(heightInCm) || isNaN(weightInKg)) {
    return res
      .status(400)
      .json({ error: "Invalid height or weight provided." });
  }

  // Calculate BMI
  const result = calculateBmi(heightInCm, weightInKg);
  console.log(result);
  // Return the calculated BMI
  return res.json({ result });
});

// Endpoint for Exercise Calculator
app.post("/exercises", (req: Request, res: Response) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.json({
      error: "parameters missing",
    });
  }

  if (
    !Array.isArray(daily_exercises) ||
    !daily_exercises.every((x) => typeof x === "number")
  ) {
    return res.json({
      error: "daily_exercises should be an array of numbers",
    });
  }

  if (typeof target !== "number") {
    return res.json({
      error: "target should be a number",
    });
  }
  const result = exerciseCalculator(daily_exercises, target);

  return res.json({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
