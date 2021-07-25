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

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes//posts");

app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/memories", postRoute);

app.listen(PORT, () => console.log(`server running at port: ${PORT}`));
