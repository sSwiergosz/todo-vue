const express = require('express');
const Task = require('../../../models/Task');  

const router = express.Router();

// GET TASKS
router.get('/', async(req, res) => { //this '/' points to '/api/tasks' because of variable tasks in server/index.js !
  try {
    const tasks = await Task.find();
    console.log(Task.find())
    res.json(tasks);
  } catch (err) {
    res.json({message: err});
  }
}) ;

// ADD TASKS
router.post('/', async(req, res) => {
  try {
    const task = new Task({
      name: req.body.name,
      description: req.body.description
    });
    const savedTask = await task.save();
    res.json({'savedTask': savedTask, 'message': `Added ${savedTask._id}`});
  } catch(err) {
    res.json({message: err});
  }
});

// DELETE TASKS
router.delete('/:taskId', async(req, res) => {
  try {
    const removedTask = await Task.deleteOne({_id: req.params.taskId});
    res.json({'removedTask': removedTask, 'message': `Deleted ${req.params.taskId}`});
  } catch(err) {
    res.json({message: err});
  }
});

// UPDATE NAME
router.patch('/:taskId', async (req, res) => {
  try {
    const updatedTask = await Task.updateOne(
      { _id: req.params.taskId },
      { 
        $set: {
          name: req.body.name
        }
      }
    );
    res.json({'updatedTask': updatedTask, 'message': `Updated ${req.params.taskId}`});
  } catch(err) {
    res.json({message: err});
  }
});

module.exports = router;