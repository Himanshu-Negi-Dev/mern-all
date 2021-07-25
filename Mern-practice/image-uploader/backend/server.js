const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8000;
const connectDB = require("./config/db");
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });

connectDB();

//middleware
app.use(express.json({ extended: false }));
app.use(cors());

const userRoute = require("./routes/user");

app.use("/img-upd", userRoute);

app.listen(port, () => console.log(`server running at port ${port}`));
