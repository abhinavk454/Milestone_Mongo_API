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
  try {
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
