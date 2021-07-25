const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });
connectDB();

//middleware

app.use(express.json({ extended: false }));
app.use(cors());
app.use(morgan("dev"));

//importing routed and middleware

app.use("/login-system", require("./routes/users"));
app.use("/login-system", require("./routes/auth"));
app.listen(PORT, () => {
  console.log(`listening to server: ${PORT}`);
});
