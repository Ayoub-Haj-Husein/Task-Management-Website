const Task = require("../Models/Task");
const mongoose = require('mongoose');

// Add New Task Start 
const addNewTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;

    // Include the user field with the authenticated user's ID
    const newTask = new Task({
      title,
      description,
      dueDate,
      priority,
      status,
      user: req.user._id,
    });

    const savedTask = await newTask.save();
    res.status(201).json({ message: 'Task added successfully', data: savedTask });
  } catch (error) {
    console.error('Error while adding the task:', error);
    res.status(500).json({ message: 'An error occurred while adding the task', error: error.message });
  }
};
// Add New Task End 

// Get Task By User Start
const Tasks_By_User = async (req, res) => {
  try {
    const user_id = req.user._id;
    console.log('User ID:', user_id);

    // Assuming Task is your Mongoose model
    const tasks = await Task.find({ user: user_id, isDeleted: false });
    console.log('Tasks:', tasks);

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Failed to get tasks:", error);
    res.status(500).json({ error: "Failed to get tasks" });
  }
};
// Get Task By User End

// Get Task By Id Start
const task_By_Id = async (req, res) => {
  const user = req.params.id;
  try {
    const task = await Task.findById(user);
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    res.json(task);
  } catch (error) {
    console.error("Error while reading task of id", id, ":", error);
    res.status(500).json({
      message: "An error occurred while getting the task",
      error: error.message,
    });
  }
};
// Get Task By Id End

// Delete Task By Id Start
const delete_Task_By_Id = async (req, res) => {
  const id = req.params.id;
  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found for deletion",
      });
    }

    // Check if the softDelete method is available
    if (typeof task.softDelete === 'function') {
      // Use the softDelete method
      await task.softDelete();
    } else {
      return res.status(500).json({
        message: "Soft delete method not available for the task",
      });
    }

    res.json({
      message: "Task soft deleted successfully",
      data: task,
    });
  } catch (error) {
    console.error("Error while soft deleting task of id", id, ":", error);
    res.status(500).json({
      message: "An error occurred while soft deleting the task",
      error: error.message,
    });
  }
};
// Delete Task By Id End


// Update Task By Id Start
const update_Task_By_Id = async (req, res) => {
  const id = req.params.id;
  const { title, description, due_date, brigades, status } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, due_date, brigades, status },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found for updating",
      });
    }
    res.json({
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    console.error("Error while updating task of id", id, ":", error);
    res.status(500).json({
      message: "An error occurred while updating the task",
      error: error.message,
    });
  }
};
// Update Task By Id End

module.exports = {
  addNewTask,
  Tasks_By_User,
  task_By_Id,
  delete_Task_By_Id,
  update_Task_By_Id
};
