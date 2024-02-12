import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to the MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

// create a person schema
const personSchema = mongoose.Schema({
  _id: Number,
  firstName: String,
  LastName: String,
  Age: Number,
  homeTown: String,
  job: String,
});

// create person
const Person = mongoose.model("people", personSchema);

const app = express();

// register view engine
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("table");
});

app.listen(5000, () => {
  console.log("Server is running on 5000");
});

// creating a middleware route for the error controling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
