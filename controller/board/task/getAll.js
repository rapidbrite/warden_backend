//fatch all tasks from one channel.
const channelModel = require("../../../model/channelSchema");
const taskStatusModel = require("../../../model/taskStatusSchema");
const taskModel = require("../../../model/taskSchema");
const userModel = require("../../../model/userSchema");

//utils
// const isUserPartOfChannel = require("../../../utils/isUserPartOfChannel");
const response = require("../../../utils/response")


const filterTask = (task) =>{
    const returnObj = {}
    returnObj.taskId = task.taskId;
    returnObj.taskName = task.taskName;
    returnObj.taskType = task.taskType;
    returnObj.taskAssignee = task.taskAssignee;
    returnObj.taskKey = task.taskKey;
    return returnObj;
}

const getAll = async (req, res) => {
  try {
    const { channelId, userName } = req.body;
    if (!channelId || !userName) {
      return response(400, "Please provide all the required fields", null, res);
    }
      const channel = await channelModel.findOne({ channelId }).populate("taskStatus");
     // console.log(channel);
    if (!channel) {
      return response(400, "Channel not found", null, res);
    }

    const user = await userModel.findOne({ userName });
    if (!user) {
      return response(400, "User not found", null, res);
    }
    // const part = await isUserPartOfChannel(userName, channelId);
    // if (!part) {
    //     return response(400, "User is not part of the channel", null, res);
    // }
    const taskStatuses = channel.taskStatus;
    const returnObj = {};
    for (let i = 0; i < taskStatuses.length; i++) {
        const taskStatus = await taskStatusModel.findById(taskStatuses[i]._id).populate("taskArray");
        const finalobj = taskStatus.taskArray.map(task => filterTask(task));
        returnObj[taskStatus.taskStatusName] = finalobj;
    }
     //console.log(returnObj['ToDo']);
    const tasks = await taskModel.find({ channelId: channel._id });
    if (!tasks) {
      return response(400, "Tasks not found", null, res);
    }
    return response(200, "Tasks found successfully", returnObj, res);
  } catch (err) {
    return response(400, err.message, null, res);
  }
};
module.exports = getAll;
