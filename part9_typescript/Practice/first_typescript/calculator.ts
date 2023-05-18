export type calculatorOperation = "multiply" | "add" | "divide";

export const calculator = (
  a: number,
  b: number,
  op: calculatorOperation
): string => {
  switch (op) {
    case "multiply":
      return `The result of multiplication is: ${a * b}`;
    case "divide":
      if (b === 0) throw new Error("Can't divide by 0!");
      return `The result of dividing is: ${a / b}`;

    case "add":
      return `The result of adding is: ${a + b}`;
    default:
      throw new Error("Operation is not multiply, add or divide!");
  }
};

// const a: number = Number(process.argv[2]);
// const b: number = Number(process.argv[3]);
// const operation: calculatorOperation = process.argv[4] as calculatorOperation;
// const result = calculator(a, b, operation);
// console.log(result);
