const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });
const PORT = process.env.PORT || 5000;
const connectDB = require("./db/db");

//connecting to database

connectDB();

//middleware

app.use(express.json({ extended: false }));
app.use(cors());
app.use(morgan("dev"));

//routes middleware
app.use("/post-app/users", require("./routes/users"));
app.use("/post-app/auth", require("./routes/auth"));
app.use("/post-app/posts", require("./routes/posts"));

app.listen(PORT, () => console.log(`connected to server: ${PORT}`));
