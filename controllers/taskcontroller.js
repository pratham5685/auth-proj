const express = require('express');
const Task = require('../models/taskModel.js');


const app = express();


app.use(express.json());


const newTask =async (req,res,next)=>{
    const { title, description } = req.body;

    // Check if title and description are provided
    if (!title || !description) {
        return res.status(400).json({
            success: false,
            message: "Title and description are required."
        });
    }

    try {
        // Create a new task
        const task = await Task.create({
            title,
            description,
            user: req.user._id, // Assuming req.user contains the authenticated user and its _id
        });

        res.status(201).json({
            success: true,
            message: "Task is added!",
            task, // Optionally return the created task
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while creating the task."
        });
    };

};


const getAllTasks = async (req,res,next) =>{
   try {
    const userid = req.user._id;
    const data = await Task.find({user : userid});


    res.status(200).json({
    success : true,
    data,
   });
    
   } catch (error) {
     next(error)
   }
};

const updateTask = async (req,res,next) =>{
    try {
    const {id }= req.params;
    console.log(id);

    const task = await Task.findById(id);

    if(!task) return next(new Error('Invalid!'))

    task.isCompleted = !task.isCompleted;

    await task.save();



    res.json({
        success : true,
        message :"it working man",
        task,
    })
        
    } catch (error) {
        next(error)
    }


};


const deleteTask = async (req,res,next) =>{
  try {
        // get task id
        const {id} = req.params;

        // find task by task id 
        const task = await Task.findById(id);
      
    
        // check if there is a task or not 
        if(!task){
            return next(new Error('Invalid!'))
        };
    
        // delete task by its id 
        await Task.deleteOne({ _id :id })
    
        res.json({
            success : true,
            message : "task is deleted! "
        });
    
  } catch (error) {
    next(error);
    
  }

};



module.exports = {newTask,getAllTasks,updateTask,deleteTask};