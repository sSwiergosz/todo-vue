const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// GET TASKS
router.get('/', (req, res) => {
  res.send('hello')
}) //this points to /api/tasks because of variable tasks in server/index.js !
// ADD TASKS

// DELETE TASKS

module.exports = router;