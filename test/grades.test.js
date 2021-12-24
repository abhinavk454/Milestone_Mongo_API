const request = require("supertest");
const app = require("../src/app");
const Marks = require("../src/mongoose/models/marks");
const { marks, setUpDatabase } = require("./utils/testDB");

//setting up the database before each test case
beforeEach(setUpDatabase);

//adding a valid mark statement
test("Adding a valid mark statement", async () => {
  await request(app)
    .post("/add")
    .send({
      name: "student new",
      dept: "IT",
      sub_1: 67,
      sub_2: 78,
      sub_3: 87,
      sub_4: 75,
      sub_5: 81,
    })
    .expect(201);
  const marks_count = await Marks.count();
  expect(marks_count).toBe(6);
});

//adding a mark statement with invalid name
test("Adding a mark statement with name having lesser than 3 characters", async () => {
  await request(app)
    .post("/add")
    .send({
      name: "st",
      dept: "IT",
      sub_1: 67,
      sub_2: 78,
      sub_3: 87,
      sub_4: 75,
      sub_5: 81,
    })
    .expect(400);
});

//adding a mark statement with invalid name
test("Adding a mark statement with name having special characters", async () => {
  await request(app)
    .post("/add")
    .send({
      name: "Student # new",
      dept: "IT",
      sub_1: 67,
      sub_2: 78,
      sub_3: 87,
      sub_4: 75,
      sub_5: 81,
    })
    .expect(400);
});

//adding a mark statement with invalid department
test("Adding a mark statement with invalid department", async () => {
  await request(app)
    .post("/add")
    .send({
      name: "student new",
      dept: "BCA",
      sub_1: 67,
      sub_2: 78,
      sub_3: 87,
      sub_4: 75,
      sub_5: 81,
    })
    .expect(400);
});

//adding a mark statement with negative marks
test("Adding a mark statement with negative marks", async () => {
  await request(app)
    .post("/add")
    .send({
      name: "student new",
      dept: "PHY",
      sub_1: -67,
      sub_2: 78,
      sub_3: 87,
      sub_4: 75,
      sub_5: 81,
    })
    .expect(400);
});

//getting results of all the students
test("Getting results of all the students", async () => {
  const response = await request(app).get("/results").expect(200);
  expect(response.body.length).toBe(5);
  expect(response.body[0].average).toBe(59.6);
  expect(response.body[0].cgpa).toBe(6.8);
  expect(response.body[0].grade).toBe("B");
  expect(response.body[1].average).toBe(75.2);
  expect(response.body[1].cgpa).toBe(9.2);
  expect(response.body[1].grade).toBe("O");
  expect(response.body[2].average).toBe(49.6);
  expect(response.body[2].cgpa).toBe(4.4);
  expect(response.body[2].grade).toBe("F");
  expect(response.body[4].average).toBe(68.6);
  expect(response.body[4].cgpa).toBe(8.4);
  expect(response.body[4].grade).toBe("A");
});

//getting results of students of a department
test("Getting resulst of students of a particular department", async () => {
  const response = await request(app)
    .get(`/results?dept=${marks[0].dept}`)
    .expect(200);
  expect(response.body.length).toBe(3);
  expect(response.body[0].average).toBe(59.6);
  expect(response.body[0].cgpa).toBe(6.8);
  expect(response.body[0].grade).toBe("B");
  expect(response.body[1].average).toBe(49.6);
  expect(response.body[1].cgpa).toBe(4.4);
  expect(response.body[1].grade).toBe("F");
  expect(response.body[2].average).toBe(68.6);
  expect(response.body[2].cgpa).toBe(8.4);
  expect(response.body[2].grade).toBe("A");
});

//getting record of a particular student
test("Getting result of a particular student", async () => {
  const response = await request(app)
    .get(`/results?id=${marks[3]._id}`)
    .expect(200);
  expect(response.body.length).toBe(1);
  expect(response.body[0].average).toBe(66.4);
  expect(response.body[0].cgpa).toBe(7.2);
  expect(response.body[0].grade).toBe("F");
});
