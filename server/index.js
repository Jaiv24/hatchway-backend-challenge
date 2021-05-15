import path from "path";
import express, { response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import axios from "axios";

const app = express();
app.use(bodyParser.json());
app.use(morgan("dev"));

// PORT Will be constant
const PORT = 5000;

// Step-1
app.get("/api/ping", (req, res) => {
  res.status(200).send({
    success: "true",
  });
});

// Step-2
app.get("/api/posts", (req, res) => {
  axios
    .get("http://hatchways.io/api/assessment/blog/posts")
    .then((response) => {
      res.send(response.data);
    });
  axios
    .all([
      axios.get("http://hatchways.io/api/assessment/blog/posts?tag=tech"),
      axios.get("http://hatchways.io/api/assessment/blog/posts?tag=history"),
    ])
    .then(
      axios.spread((response1, response2) => {
        const data1 = response1.data.posts;
        const data2 = response2.data.posts;
        const posts = data1.concat(data2);
        const post = {
          posts,
        };
        res.status(200).send(post);
      })
    )
    .catch((error) => {
      console.log(error); // Just to debug error
      res.status(400).send({
        error: "Tags is required",
      });
      console.log(error);
    });
});

app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
