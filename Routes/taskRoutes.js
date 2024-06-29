const express = require('express');
const {newTask,getAllTasks,updateTask,deleteTask} = require('../controllers/taskcontroller.js');
const {isAuthenticated} = require('../middlewares/auth.js')




const router = express.Router();

router.post("/newpost",isAuthenticated,newTask);
router.get('/mytasks',isAuthenticated,getAllTasks);
router.put('/:id',isAuthenticated,updateTask);
router.delete('/:id',isAuthenticated,deleteTask);



module.exports = router ;