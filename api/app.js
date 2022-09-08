const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routers/user");
const taskRoutes = require("./routers/task");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(userRoutes);
app.use(taskRoutes);

mongoose.connect("mongodb://0.0.0.0:27017/toDo").then(() => {
  app.listen(3030);
});
