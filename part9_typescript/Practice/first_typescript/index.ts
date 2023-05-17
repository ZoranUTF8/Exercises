import express from "express";
const app = express();

// ? you can prefix it with an underscore to inform the compiler you have thought about it and there is nothing you can do.
app.get("/ping", (_req, res) => {
  res.send("pong");
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
