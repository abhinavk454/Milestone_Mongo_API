const mongoose = require("mongoose");

//connection to database
mongoose.connect(
  "mongodb://127.0.0.1:27017/grade-application",
  {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) {
      return console.error(err);
    }
    console.log("Connected to database");
  }
);
