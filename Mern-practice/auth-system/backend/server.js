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

app.use("/auth", require("./routes/auth"));

app.listen(PORT, () => console.log(`connected to server at PORT: ${PORT}`));
