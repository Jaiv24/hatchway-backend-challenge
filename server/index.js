const path = require("path");
const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const axios = require("axios");
const apicache = require("apicache");
const { step1, getTags } = require("./controller/controller.js");

app.use(bodyParser.json());
app.use(morgan("dev"));

const cache = apicache.middleware;

app.use(express.static(path.join(__dirname, "../client/public")));

const PORT = 5001;

// Step 1
// The response times reduce with subsequent calls while using the cache and they do not reduce
app.get("/api/ping", cache("60 minutes"), step1);

// Step 2
// SortBy and direction default to id and asc, respectively
app.get("/api/posts/:tags/:sortBy?/:direction?", cache("60 minutes"), getTags);

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
