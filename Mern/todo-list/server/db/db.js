const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("connected to db...");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
module.exports = connectDB;
