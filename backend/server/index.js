const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const tasks = require('./routes/api/tasks');
app.use('/api/tasks', tasks);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listens on port ${PORT}`))