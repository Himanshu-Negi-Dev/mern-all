const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8000;
const connectDB = require("./config/db");

connectDB();

app.use(express.json());
app.use(cors());

const authRotes = require("./routes/auth");
app.use("/api", authRotes);



app.listen(PORT, () => console.log("connected to server..."));
