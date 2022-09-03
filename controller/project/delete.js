const channelModel = require("../../model/channelSchema");
const userModel = require("../../model/userSchema");
const projectModel = require("../../model/projectSchema");
const taskStatusModel = require("../../model/taskStatusSchema");
const taskModel = require("../../model/taskSchema");

const response = require("../../utils/response");
const deleteProject = async (req, res) => {
  try {
    const { projectId, userName } = req.body;
    const project = await projectModel
      .findOne({
        projectId: projectId,
      })
      .populate("owner");
    if (!project) {
      return response(400, "Project not found!", null, res);
    }
    // owner
    const owner = await userModel.findOne({
      userName: userName,
    });
    if (project.owner.userName !== userName) {
      return response(
        400,
        "Only Project creator is allowed to delete the project",
        null,
        res
      );
    }

    // from all admin object(admin.projects) remove this project

    const admin = project.admin;
    for (let i = 0; i < admin.length; i++) {
      const user = await userModel.findById(admin[i]);
      const index = user.projects.indexOf(project._id);
      if (index > -1) {
        user.projects.splice(index, 1);
      }
      await user.save();
    }

    // from all users object(user.projects) remove this project
    const users = project.users;
    for (let i = 0; i < users.length; i++) {
      const user = await userModel.findById(users[i]);
      const index = user.projects.indexOf(project._id);
      if (index > -1) {
        user.projects.splice(index, 1);
      }
      await user.save();
    }

    // delete all channels and tasks
    const channels = project.channels;
    for (let i = 0; i < channels.length; i++) {
      const channel = await channelModel.findById(channels[i]);
      channel.taskStatus.map(async (one) => {
        const taskStatus = await taskStatusModel.findOne({ _id: one });
        taskStatus.taskArray.map(async (task) => {
          const taskToDelete = await taskModel.findOne({ _id: task });
          await taskToDelete.remove();
        });

        await taskStatus.remove();
      });

      await channel.remove();
    }

    project.remove();
    return response(200, "Project deleted successfully", null, res);
  } catch (err) {
    return response(400, err.message, null, res);
  }
};

module.exports = deleteProject;
