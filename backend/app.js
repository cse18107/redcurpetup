const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const taskRouter = require('./routes/taskRouter');


const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/user',userRouter);
app.use('/api/task',taskRouter);

module.exports = app;