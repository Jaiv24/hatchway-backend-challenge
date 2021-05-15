import path from "path";
import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

// PORT Will be constant
const PORT = 5000;

app.get("/api/ping", (req, res) => {
  res.status(200).send("success");
});

app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
