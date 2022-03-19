const express = require('express')
const {
  getAllTasks,
  addNewTask,
  getSingleTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController')

const router = express.Router()

router.route('/').get(getAllTasks).post(addNewTask)
router.route('/:id').get(getSingleTask).patch(updateTask).delete(deleteTask)

module.exports = router
