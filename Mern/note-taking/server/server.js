const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });
const connecDB = require("./config/db");

connecDB();

app.use(express.json({ extended: false }));
app.use(cors());

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const noteRoute = require("./routes/notes");

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/notes", noteRoute);

app.get("/", (req, res) => {
  res.send("hello from server");
});

app.listen(port, () => {
  console.log(`server running on port : ${port}`);
});
