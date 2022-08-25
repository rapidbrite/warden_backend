const userModel = require("../../../model/userSchema");
const taskModel = require("../../../model/taskSchema");
const taskStatusModel = require("../../../model/taskStatusSchema");
const channelModel = require("../../../model/channelSchema");

const { v4: uuid } = require("uuid");

// utils
const isUserPartOfChannel = require("../../../utils/isUserPartOfChannel");
const response = require("../../../utils/response");

const changeStatus = async (req, res) => {
  try {
    const {
      userName,
      channelId,
      sourcetaskStatusName,
      destinationStatusName,
      sourceindex,
      destinationindex,
      realtaskId,
    } = req.body;

    if (
      !userName ||
      !channelId ||
      !sourcetaskStatusName ||
      !destinationStatusName ||
      !realtaskId
    ) {
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

    const sourcetaskStatusobj = await taskStatusModel.findOne({
      channelId: channel._id,
      taskStatusName: sourcetaskStatusName,
    });
    if (!sourcetaskStatusobj) {
      return response(400, "Source Task Status not found", null, res);
    }
    const destinationtaskStatusobj = await taskStatusModel.findOne({
      channelId: channel._id,
      taskStatusName: destinationStatusName,
    });
    if (!destinationtaskStatusobj) {
      return response(400, "Destination Task Status not found", null, res);
    }

    const sourcetaskArray = sourcetaskStatusobj.taskArray;
    const sourceTask = sourcetaskArray[sourceindex];

    if (sourceTask.toString() !== task._id.toString()) {
      return response(400, "Task not found, please reload page", null, res);
    }
    sourcetaskArray.splice(sourceindex, 1);
    destinationtaskStatusobj.taskArray.splice(destinationindex, 0, sourceTask);
    sourcetaskStatusobj.taskArray = sourcetaskArray;
    await sourcetaskStatusobj.save();
    await destinationtaskStatusobj.save();

    task.taskStatus = destinationStatusName;
    await task.save();
    //console.log(task);

    return response(200, "Task status changed successfully", null, res);
  } catch (err) {
    return response(500, "Internal server error", null, res);
  }
};

module.exports = changeStatus;
