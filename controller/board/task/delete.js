const channelModel = require("../../../model/channelSchema");
const userModel = require("../../../model/userSchema");
const taskModel = require("../../../model/taskSchema");
const taskStatusModel = require("../../../model/taskStatusSchema");

const { v4: uuid } = require("uuid");

// utils
const isUserPartOfChannel = require("../../../utils/isUserPartOfChannel");
const response = require("../../../utils/response");

const deleteTask = async (req, res) => {
    try {
        const { userName, taskId, channelId } = req.body;
        if (!userName || !taskId  || !channelId)  { 
            return response(400, "Please provide all the required fields", null, res);
        }
        const user = await userModel.findOne({ userName });
        if (!user) {
            return response(400, "User not found", null, res);
        }
        const task = await taskModel.findOne({ taskId });
        if (!task) {
            return response(400, "Task not found", null, res);
        }
        const part = await isUserPartOfChannel(userName, channelId);
        if (!part) {
            return response(400, "User is not part of the channel", null, res);
        }

        const taskStatusobj = await taskStatusModel.findOne({ channelId: task.channelId, taskStatusName: task.taskStatus });

        if (!taskStatusobj) {
            return response(400, "Task Status not found", null, res);
        }
        const index = taskStatusobj.taskArray.indexOf(task._id);
        taskStatusobj.taskArray.splice(index, 1);
        await taskStatusobj.save();
        await task.remove();
        return response(200, "Task deleted successfully", null, res);

        
    } catch (err) {
        return response(500, "Internal server error", null, res);
    }
}

module.exports = deleteTask;