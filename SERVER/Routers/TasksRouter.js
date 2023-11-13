const { Router } = require("express");
const TaskController = require("../Controllers/TasksController")
const router = Router();
const athentication = require('../Middleware/athentication');

router.post("/Add_New_Task", athentication.verifyJWT, TaskController.addNewTask)
router.get("/Get_Tasks_By_User", athentication.verifyJWT, TaskController.Tasks_By_User);
router.get("/Get_Task_By_Id/:id", athentication.verifyJWT, TaskController.task_By_Id);
router.delete("/Delete_Task_By_Id/:id", TaskController.delete_Task_By_Id);
router.put("/Update_Task_By_Id/:id", TaskController.update_Task_By_Id);

module.exports = router;


