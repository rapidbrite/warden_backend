const channelModel = require("../../model/channelSchema");
const userModel = require("../../model/userSchema");
const projectModel = require("../../model/projectSchema");
const taskStatusModel = require("../../model/taskStatusSchema");
const taskModel = require("../../model/taskSchema");

const isUserAdminOfProject = require("../../utils/isUserAdminOfProject");
const response = require("../../utils/response");

const deleteChannel = async (req, res) => {
  try {
    const { userName, channelId } = req.body;

    if (!userName || !channelId) {
      return response(400, "Please provide all the required fields", null, res);
    }

    const user = await userModel.findOne({ userName });
    if (!user) {
      return response(400, "User not found", null, res);
    }

    const channel = await channelModel.findOne({ channelId });
    if (!channel) {
      return response(400, "Channel not found", null, res);
    }

    const project = await projectModel.findOne({ _id: channel.project });
    if (!project) {
      return response(400, "Project not found", null, res);
    }

    const part = await isUserAdminOfProject(userName, project.projectId);
    if (!part) {
      return response(400, "User is not Admin of the project", null, res);
    }
    
    project.channels = project.channels.filter((one) => one.toString() !== channel._id.toString());
    await project.save();
    
    channel.taskStatus
      .map(async (one) => {
        const taskStatus = await taskStatusModel.findOne({ _id: one });
        taskStatus.taskArray
          .map(async (task) => {
            const taskToDelete = await taskModel.findOne({ _id: task });
            await taskToDelete.remove();
          })
          
        await taskStatus.remove();
      })
      

    await channel.remove();
    
    return response(200, "Channel deleted successfully", null, res);
  } catch (err) {
    return response(400, err.message, null, res);
  }
};

module.exports = deleteChannel;
