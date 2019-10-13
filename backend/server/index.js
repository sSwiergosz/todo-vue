const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const tasksRoute = require('./routes/api/tasks');
const authRoute = require('./routes/api/auth');
app.use('/api/tasks', tasksRoute);
app.use('/api/user', authRoute);

// DB connection
const mongoURL = 'mongodb://localhost:27017/tasks';
mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true}, () => console.log('Connected to DB!'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listens on port ${PORT}`));
