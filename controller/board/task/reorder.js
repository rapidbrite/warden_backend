const userModel = require("../../../model/userSchema");
const taskModel = require("../../../model/taskSchema");
const taskStatusModel = require("../../../model/taskStatusSchema");
const channelModel = require("../../../model/channelSchema");

const { v4: uuid } = require("uuid");

// utils
const isUserPartOfChannel = require("../../../utils/isUserPartOfChannel");
const response = require("../../../utils/response");

const reorderTask = async (req, res) => {
    try{
        const { userName,channelId , taskStatusName , sourceindex , destinationindex , realtaskId } = req.body;
        //console.log(req.body);
        if (!userName || !channelId || !taskStatusName ) {
            return response(400, "Please provide all the required fields", null, res);
        }
        
        const user = await userModel.findOne({ userName });
        if (!user) {
            return response(400, "User not found", null, res);
        }

        
        const part = await isUserPartOfChannel(userName, channelId);
        if (!part) {
            return response(400, "User is not part of the channel", null, res);
        }
        const channel = await channelModel.findOne({ channelId });
        if (!channel) {
            return response(400, "Channel not found", null, res);
        }

        const task = await taskModel.findOne({ taskId: realtaskId });
        if (!task) {
            return response(400, "Task not found", null, res);
        }

        
        const taskStatusobj = await taskStatusModel.findOne({ channelId: channel._id, taskStatusName: taskStatusName });
        if (!taskStatusobj) {
            return response(400, "Task Status not found", null, res);
        }
        
        const taskArray = taskStatusobj.taskArray;
        const sourceTask = taskArray[sourceindex];
        if(sourceTask.toString() !== task._id.toString()){    
            return response(400, "Task not found, please reload page", null, res);
        }
        taskArray.splice(sourceindex, 1);
        taskArray.splice(destinationindex, 0, sourceTask);
        taskStatusobj.taskArray = taskArray;
        //console.log(taskStatusobj.taskArray);
        await taskStatusobj.save();

        return response(200, "Task reordered successfully", null, res);

    }
    catch(err){
        return response(500, "Internal server error", null, res);
    }

}

module.exports = reorderTask;