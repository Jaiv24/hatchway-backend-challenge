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
  // Gets all posts with at least one tag from the API using axios
  axios
    .all([
      axios.get("http://hatchways.io/api/assessment/blog/posts?tag=tech"),
      axios.get("http://hatchways.io/api/assessment/blog/posts?tag=history"),
      axios.get("http://hatchways.io/api/assessment/blog/posts?tag=health"),
      axios.get("http://hatchways.io/api/assessment/blog/posts?tag=startups"),
      axios.get("http://hatchways.io/api/assessment/blog/posts?tag=science"),
      axios.get("http://hatchways.io/api/assessment/blog/posts?tag=design"),
      axios.get("http://hatchways.io/api/assessment/blog/posts?tag=culture"),
      axios.get("http://hatchways.io/api/assessment/blog/posts?tag=politics"),
      axios.get("http://hatchways.io/api/assessment/blog/posts?tag=science"),
    ])
    .then(
      axios.spread(
        (
          response1,
          response2,
          response3,
          response4,
          response5,
          response6,
          response7,
          response8,
          response9
        ) => {
          // Organizes data into an array
          let data = [
            response1.data.posts,
            response2.data.posts,
            response3.data.posts,
            response4.data.posts,
            response5.data.posts,
            response6.data.posts,
            response7.data.posts,
            response8.data.posts,
            response9.data.posts,
          ];
          // Object so that a hash can be made on the id of the post and remove duplicates
          let post = {};
          let posts = [];
          for (let i = 0; i < data.length; i++) {
            let blog = data[i];
            for (let i = 0; i < blog.length; i++) {
              post[blog[i].id] = blog[i];
            }
          }
          // Create response object so that the result of the request is in the correct format
          for (let key in post) {
            posts.push(post[key]);
          }
          let response = {
            posts,
          };
          res.status(200).send(response);
        }
      )
    )
    .catch((error) => {
      res.status(400).send({
        error: "Tags parameter is required",
      });
      console.log(error);
    });
});

app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
