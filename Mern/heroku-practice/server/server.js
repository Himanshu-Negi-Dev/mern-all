const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

//creating express app

const app = express();

//importing routes

const postRoutes = require("./Routes/post");
const authRoutes = require("./Routes/auth");

//connecting to db
mongoose
   .connect(process.env.DATABASE, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
   })
   .then(() => {
      console.log("connected to db");
   })
   .catch((err) => {
      console.log(err);
   });

//middleware

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

//routes middleware

app.use("/api", postRoutes);
app.use("/api", authRoutes);

const port = 8000;

app.listen(port, () => {
   console.log("Connected to server");
});
