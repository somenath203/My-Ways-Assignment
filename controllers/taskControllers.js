const { StatusCodes } = require('http-status-codes');
const expressAsyncHandler = require('express-async-handler');

const Task = require('./../models/Task');



const createTask = expressAsyncHandler(async (req, res) => {

    const { title, description } = req.body;

    await Task.create({
        title: title,
        description: description,
        createdBy: req?.body?.user
    });

    res.status(StatusCodes.CREATED).send({
        success: true,
        message: 'your task is created successfully'
    });

});


const fetchAllTask = expressAsyncHandler(async (req, res) => {

    const allTasks = await Task.find({ createdBy: req?.body?.user });

    res.status(StatusCodes.OK).send({
        success: true,
        message: 'all tasks fetched successfully',
        totalNumberOfTasks: allTasks.length,
        tasks: allTasks
    });

});


const updateTask = expressAsyncHandler(async (req, res) => {

    const { title, description } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(req.params.idOfTheTask, { title, description }, { new: true, runValidators: true });

    res.status(StatusCodes.OK).send({
        success: true,
        message: 'your task has been updated successfully',
        updatedTask: updatedTask
    });

});


const isTaskCompleted = expressAsyncHandler(async (req, res) => {

    await Task.findByIdAndUpdate(req.params.idOfTheTask, { isTaskCompleted: true }, { new: true, runValidators: true });

    res.status(StatusCodes.OK).send({
        success: true,
        message: 'task has been markd as completed successfully',
    });

});


const completedTasks = expressAsyncHandler(async (req, res) => {

    const tasks = await Task.find({ isTaskCompleted: true, createdBy: req?.body?.user });

    res.status(StatusCodes.OK).send({
        success: true,
        message: 'all completed tasks has been fetched successfully',
        numberOfTasks: tasks.length,
        tasks: tasks
    });

});

const taskInProgress = expressAsyncHandler(async (req, res) => {

    const tasks = await Task.find({ isTaskCompleted: false, createdBy: req?.body?.user });

    res.status(StatusCodes.OK).send({
        success: true,
        message: 'all in-progress tasks as completed successfully',
        numberOfTasks: tasks.length,
        tasks: tasks
    });

});


const deleteTask = expressAsyncHandler(async (req, res) => {


    await Task.findByIdAndDelete(req.params.idOfTheTask);

    res.status(StatusCodes.OK).send({
        success: true,
        message: 'your task has been deleted successfully'
    });

});


module.exports = {
    createTask,
    deleteTask,
    updateTask,
    fetchAllTask,
    isTaskCompleted,
    completedTasks,
    taskInProgress
};