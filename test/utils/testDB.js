const mongoose = require("mongoose");
const Marks = require("../../src/mongoose/models/marks");

//setting up the data for db
const marks = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: "student one",
    dept: "CS",
    sub_1: 67,
    sub_2: 58,
    sub_3: 67,
    sub_4: 55,
    sub_5: 51,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "student two",
    dept: "MAT",
    sub_1: 87,
    sub_2: 65,
    sub_3: 63,
    sub_4: 83,
    sub_5: 78,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "student three",
    dept: "CS",
    sub_1: 45,
    sub_2: 35,
    sub_3: 36,
    sub_4: 76,
    sub_5: 56,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "student four",
    dept: "CHE",
    sub_1: 87,
    sub_2: 76,
    sub_3: 38,
    sub_4: 47,
    sub_5: 84,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "student five",
    dept: "CS",
    sub_1: 64,
    sub_2: 79,
    sub_3: 63,
    sub_4: 64,
    sub_5: 73,
  },
];

//setting up function to set up the database
const setUpDatabase = async () => {
  await Marks.deleteMany();
  for (let i = 0; i < marks.length; i++) {
    await new Marks(marks[i]).save();
  }
};

//exporting modules
module.exports = {
  setUpDatabase,
  marks,
};
