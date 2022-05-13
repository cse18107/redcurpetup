const express = require("express");
const taskController = require("../controllers/taskController");

const router = express.Router();

router.route("/").get(taskController.getTasks).post(taskController.createTask);
router
  .route("/:id")
  .get(taskController.getTask)
  .put(taskController.updateTasks)
  .delete(taskController.deleteTasks);

module.exports = router;
