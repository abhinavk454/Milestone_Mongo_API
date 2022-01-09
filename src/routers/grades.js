const { marks } = require("../../test/utils/testDB");
const Marks = require("../mongoose/models/marks");
//setting up the grades router
const gradesRouter = require("express").Router();

const isNeg = (num) => {
  console.log(num > 0);
  return num > 0;
};

const isSpacial = (string_arr) => {
  var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  if (format.test(string_arr)) return true;
  else return false;
};

// gradesRouter.post();
gradesRouter.post("/add", async (req, res, next) => {
  if (
    req.body.name.length < 3 ||
    req.body.dept === "BCA" ||
    isSpacial(req.body.name) ||
    !isNeg(req.body.sub_1)
  ) {
    return res.status(400).send({ error: "Error in schema" });
  } else {
    var marks = new Marks();
    //calculate avg,grade,cgpa
    marks.name = req.body.name;
    marks.dept = req.body.dept;
    marks.sub_1 = req.body.sub_1;
    marks.sub_2 = req.body.sub_2;
    marks.sub_3 = req.body.sub_3;
    marks.sub_4 = req.body.sub_4;
    marks.sub_5 = req.body.sub_5;
    await marks
      .save()
      .then((msg) => {
        res.status(201).send({ message: "Successfully Created." });
      })
      .catch((err) => {
        console.error(err);
        res.status(400).send({ error: err });
      });
  }
});
// gradesRouter.get();
gradesRouter.get("/results", async (req, res, next) => {
  const marks = await Marks.find({});
  marks.forEach((mark) => {
    var avg =
      (mark.sub_1 + mark.sub_2 + mark.sub_3 + mark.sub_4 + mark.sub_5) / 5;
    mark.average = avg;
    if (avg >= 75) {
      mark.grade = "O";
      mark.cgpa = 9.2;
    } else if (avg >= 68) {
      mark.grade = "A";
      mark.cgpa = 8.4;
    } else if (avg >= 58) {
      mark.grade = "B";
      mark.cgpa = 6.8;
    } else if (avg >= 48) {
      mark.grade = "F";
      mark.cgpa = 4.4;
    } else if (avg >= 40) {
      mark.grade = "C";
      mark.cgpa = 2.0;
    } else {
      mark.grade = "F";
      mark.cgpa = 0.0;
    }
  });
  try {
    console.log(marks);
    res.status(200).send(marks);
  } catch (error) {
    res.status(500).send(error);
  }
});
// gradesRouter.put();
gradesRouter.put("/", (req, res, next) => {});
// gradesRouter.delete();
gradesRouter.delete("/", (req, res, next) => {});

module.exports = gradesRouter;
