const express = require("express");
const gradeRouter = require("./routers/grades");
require("./mongoose/db/mongoose");

//setting up the app server
const app = express();

//setting up the middleware
app.use(express.json());
app.use(gradeRouter);

//exporting the server
module.exports = app;
