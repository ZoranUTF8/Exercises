import express from "express";
const app = express();
import { calculator, calculatorOperation } from "./calculator";

// ? you can prefix it with an underscore to inform the compiler you have thought about it and there is nothing you can do.
app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.post("/calculator", (req, res) => {
  const { value1, value2, operation } = req.body;

  // assert the type

  const result = calculator(
    Number(value1),
    Number(value2),
    operation as calculatorOperation
  );

  res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
