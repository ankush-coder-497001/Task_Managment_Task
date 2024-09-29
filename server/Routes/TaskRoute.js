// routes/tasks.js
const express = require('express');
const Task = require('../Models/task');
const User = require('../Models/user');
const router = express.Router();
const { verifyToken } = require('../verification'); 

// Create a new task
router.post('/Create', async (req, res) => {
  const { title, description, dueDate, status, assignedEmail, priority } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email: assignedEmail });

    if (!user) {
      return res.status(404).json({ msg: 'User not found with that email' });
    }

    // Create the task with the user's ID as assignedUser
    const newTask = new Task({
      title,
      description,
      dueDate,
      status,
      assignedUser: user._id, // Use the found user's ID
      priority
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ msg: 'Error creating task', error: error.message });
  }
});

// Retrieve all tasks
router.get('/All', async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedUser', 'name email'); // Populate assignedUser with name and email
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ msg: 'Error retrieving tasks', error: error.message });
  }
});

// Delete a task by ID
router.delete('/Delete/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    res.json({ msg: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Error deleting task', error: error.message });
  }
});


// PUT route for updating a task by ID
router.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, status, priority } = req.body;

    // Find task by ID and update it
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        title,
        description,
        dueDate,
        status,
        priority,
      },
      { new: true } // This option returns the updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


// GET route for fetching a task by ID
router.get("/SingleTask/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the task by ID
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Send the task as a response
    res.json({ task });
  } catch (error) {
    console.error("Error fetching task by ID:", error);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
