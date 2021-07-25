const express = require("express");
const app = express();
require("./db/conn");
const Cruds = require("./models/model");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/read", async (req, res) => {
   try {
      const data = await Cruds.find({});
      res.send(data);
   } catch (error) {
      res.send(error);
   }
});
app.post("/insert", async (req, res) => {
   const name = req.body.name;
   const days = req.body.days;

   const insertData = new Cruds({ name: name, lastEat: days });
   try {
      await insertData.save();
      res.send("data inserted");
   } catch (error) {
      console.log(error);
   }
});
app.put("/update", async (req, res) => {
   const id = req.body.id;
   const updateName = req.body.updateName;
   try {
      await Cruds.findByIdAndUpdate(id, { name: updateName });
   } catch (error) {
      console.log(error);
   }
});

app.delete("/delete/:id", async (req, res) => {
   const id = req.params.id;
   try {
      await Cruds.findByIdAndDelete(id);
   } catch (error) {
      console.log(error);
   }
});

app.listen(8000, () => console.log("Connected to Server!"));
