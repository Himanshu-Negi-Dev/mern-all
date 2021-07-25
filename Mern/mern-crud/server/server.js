const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

//importRoutes

const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");

//app

const app = express();

//db

mongoose
   .connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
   })
   .then(() => console.log("DB connected!"))
   .catch((err) => console.log(err));

//middleware

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

// router middleware

app.use("/api", postRoutes);
app.use("/api", authRoutes);



//port

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Connected to server at ${port}`));
