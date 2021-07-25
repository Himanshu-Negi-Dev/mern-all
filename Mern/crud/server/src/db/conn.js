const mongoose = require("mongoose");

mongoose
   .connect("mongodb://localhost:27017/crud-app", {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
   })
   .then(() => console.log("Connected to Database"))
   .catch((err) => console.log(err));
