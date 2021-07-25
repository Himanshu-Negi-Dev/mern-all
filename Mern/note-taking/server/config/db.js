const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log("connected to db...");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
