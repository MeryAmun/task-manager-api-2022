const Task = require('../models/taskModel')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/customError')

//get all tasks
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({})
  res.status(200).json({ tasks })
})

//add new task
const addNewTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body)
  res.status(201).send({ task })
})

//get single task
const getSingleTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params
  const task = await Task.findOne({ _id: taskID })
  if (!task) {
    return next(createCustomError(`No task with  id ${taskID}`, 404))
  }
  res.status(200).json({
    task: task,
  })
})

//update task
const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  })
  if (!task) {
    return next(createCustomError(`No task with  id ${taskID}`, 404))
  }

  res.status(200).json({ task })
})

//delete task
const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params
  const task = await Task.findOneAndDelete({ _id: taskID })
  if (!task) {
    return next(createCustomError(`No task with  id ${taskID}`, 404))
  }
  res.status(200).json({ task })
})

module.exports = {
  getAllTasks,
  addNewTask,
  updateTask,
  getSingleTask,
  deleteTask,
}
