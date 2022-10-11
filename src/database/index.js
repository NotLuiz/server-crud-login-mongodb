const mongoose = require("mongoose");

const connectToDatabase = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.6jmqikj.mongodb.net/database?retryWrites=true&w=majority`,
    (error) => {
      if (error) {
        return console.log("Error connecting to database:", error);
      }
      return console.log("Successful database connection");
    }
  );
};

module.exports = connectToDatabase;
