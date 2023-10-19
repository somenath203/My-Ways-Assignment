const express = require('express');

const { createTask, deleteTask, fetchAllTask, updateTask, isTaskCompleted, completedTasks, taskInProgress } = require('../controllers/taskControllers');
const { auth } = require('../middlewares/isLoggedInMiddleware');


const router = express.Router();


router.get('/get-all-tasks', auth, fetchAllTask);
router.post('/add-new-task', auth, createTask);
router.put('/update-task/:idOfTheTask', auth, updateTask);
router.get('/completed-tasks', auth, completedTasks);
router.get('/in-progress-tasks', auth, taskInProgress);
router.put('/update-task/:idOfTheTask', auth, isTaskCompleted);
router.delete('/delete-task/:idOfTheTask', auth, deleteTask);


module.exports = router;