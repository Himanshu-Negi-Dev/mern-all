const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8000;
const connectDB = require('./db/db');
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });

connectDB();

app.use(express.json({ extended: false }));
app.use(cors());

const todoRoutes = require("./routes/todo");
app.use("/todos", todoRoutes);

app.listen(PORT, console.log(`listening to port: ${PORT}`));
