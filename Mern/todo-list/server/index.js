const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./db/db");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 5000;
dotenv.config({ path: `${__dirname}/config.env` });

connectDB();

app.use(express.json({ extended: false }));
app.use(cors());
app.use(morgan("dev"));

app.use("/todos", require("./routes/todo"));

app.listen(PORT, () => {
  console.log(`server running at port: ${PORT}`);
});
