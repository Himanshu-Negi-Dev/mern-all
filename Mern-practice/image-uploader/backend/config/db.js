const mongoose = require("mongoose");

const connecDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("connected to database...");
  } catch (error) {
    console.log(error);
  
  }
};

module.exports = connecDB;
