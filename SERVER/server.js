const express = require('express');
const app = express();
const mongoose = require("mongoose")
const port = 4000;
const TasksRouter = require("./Routers/TasksRouter")
const UserRouter = require("./Routers/UserRouter")
const cors = require('cors');
require('dotenv').config(); 
const DB_URI = process.env.DB_URI

mongoose.connect(DB_URI)
.then(() => {
  console.log("Connected Successfuly")
}).catch((error) => {
  console.log("error with connecting with the db", error)
})

app.use(express.json())
app.use(cors());
app.use(TasksRouter)
app.use(UserRouter)

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

