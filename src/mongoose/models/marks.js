const mongoose = require("mongoose");

//setup the validations as mentioned in the problem statement
//setting up the marks schema
const marksSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dept: {
    type: String,
    required: true,
  },
  sub_1: {
    type: Number,
    required: true,
  },
  sub_2: {
    type: Number,
    required: true,
  },
  sub_3: {
    type: Number,
    required: true,
  },
  sub_4: {
    type: Number,
    required: true,
  },
  sub_5: {
    type: Number,
    required: true,
  },
});

//setting up the marks collection
const Marks = mongoose.model("Marks", marksSchema);

//exporting the collection
module.exports = Marks;
