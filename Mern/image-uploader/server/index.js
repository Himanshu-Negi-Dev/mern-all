const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
dotenv.config();

//connect db

mongoose
  .connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("connected to db..."))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());
app.use('/user', require('./routes/user'));

app.listen(5000, () => console.log("server is running"));
