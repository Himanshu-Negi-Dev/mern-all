const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    });

    console.log("Conneted to db...");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
