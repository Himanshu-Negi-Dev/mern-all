const mongoose = require("mongoose");

mongoose
   .connect("mongodb://localhost:27017/request-app", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
   })
   .then(() => console.log("Connected to DataBase!"))
   .catch((err) => console.log(err));
