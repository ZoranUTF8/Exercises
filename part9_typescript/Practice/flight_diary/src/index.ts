import express from "express";
import diariesRouter from "./router/diariesRouter";
const app = express();
app.use(express.json());

const PORT = 3000;

app.get("/testRoute", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diaries", diariesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
