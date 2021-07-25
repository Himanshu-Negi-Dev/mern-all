const express = require("express");
const app = express();
require("./db/conn");
const Request = require("./models/models");
const cors = require("cors");
const port = process.env.PORT || 3001;

app.use(express.json());

app.use(cors());

app.post("/insert", async (req, res) => {
   const name = req.body.name;
   const email = req.body.email;
   const phone = req.body.phone;
   const message = req.body.message;

   const insertData = new Request({ name: name, email: email, phone: phone, message: message });
   try {
      await insertData.save();
      res.send("data inserted");
   } catch (error) {
      console.log(error);
   }
});

app.listen(port, () => {
   console.log(`Connected to Server at Port ${port}`);
});
