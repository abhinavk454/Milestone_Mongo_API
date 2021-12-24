const mongoose = require("mongoose");

//connection to database
mongoose.connect(
  "mongodb+srv://root:root123@cluster0.lal0e.mongodb.net/grade-application?retryWrites=true&w=majority",
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
