const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();

app.use(express.json());
app.use(cors());

app.use("/auth", require("./routes/auth"));

app.listen(8000, () => console.log("server running on port : 8000"));
