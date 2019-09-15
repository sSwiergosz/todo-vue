const express = require('express');
const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient

const router = express.Router();

// GET TASKS
router.get('/', async(req, res) => { //this '/' points to '/api/tasks' because of variable tasks in server/index.js !
  const tasks = await loadTasksCollection();
  res.send(await tasks.find({}).toArray()); // tasks.find({}) - take all tasks
  res.status(200).send();
}) 

// ADD TASKS
router.post('/', async(req, res) => {
  const tasks = await loadTasksCollection();
  await tasks.insertOne({
    task: req.body.task,
    createdAt: new Date()
  });
  res.status(201).send();
})

// DELETE TASKS
router.delete('/:id', async(req, res) => {
  const tasks = await loadTasksCollection();
  await tasks.deleteOne({
    _id: new mongodb.ObjectID(req.params.id)
  });
  res.status(200).send();
})

const mongoURL = 'mongodb://localhost:27017';
async function loadTasksCollection() {
  const client = await MongoClient.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true});

  return client.db('todo-vue').collection('tasks');
}

module.exports = router;