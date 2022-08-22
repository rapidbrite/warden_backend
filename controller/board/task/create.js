const channelModel = require("../../../model/channelSchema");
const userModel = require("../../../model/userSchema");
const taskModel = require("../../../model/taskSchema");
const taskStatusModel = require("../../../model/taskStatusSchema");

const { v4: uuid } = require("uuid");

// utils
const isUserPartOfChannel = require("../../../utils/isUserPartOfChannel");
const response = require("../../../utils/response");
const createTask = async (req, res) => {
    try {
        const { userName, taskName, taskDescription, taskType, taskPriority, taskAssignee, taskReporter, taskStatus, channelId } = req.body;
        if (!userName || !taskName || !taskStatus || !channelId) {
            return response(400, "Please provide all the required fields", null, res);
        }
       // console.log(taskName);
        const user = await userModel.findOne({ userName });
        if (!user) {
            return response(400, "User not found", null, res);
        }

        const channel = await channelModel.findOne({ channelId });
        if (!channel) {
            return response(400, "Channel not found", null, res);
        }

        const part = await isUserPartOfChannel(userName, channelId);
        if (!part) {
            return response(400, "User is not part of the channel", null, res);
        }

        const taskStatusobj = await taskStatusModel.findOne({ channelId : channel._id, taskStatusName: taskStatus });
        if (!taskStatusobj) {
            return response(400, "Task Status not found", null, res);
        }
        channel.currentTaskNumber++;
        let taskkey = channel.channelKey + '-' + channel.currentTaskNumber;


        const task = new taskModel({
            taskId: uuid(),
            taskName,
            taskDescription : taskDescription || "",
            taskType : taskType || "",
            taskPriority : taskPriority || "Normal",
            taskAssignee :  taskAssignee || "",
            taskReporter : taskReporter || userName, 
            taskStatus : taskStatus || "ToDo",
            channelId: channel._id,
            taskKey : taskkey

        });
        taskStatusobj.taskArray.push(task._id);
        await channel.save();
        await task.save();
        await taskStatusobj.save();
        return response(200, "Task created successfully", task, res);
    
    } catch (err) {
        return response(400, err.message, null, res);
    }
}

module.exports = createTask;
