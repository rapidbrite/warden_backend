const projectModel = require("../../model/projectSchema");
const userModel = require("../../model/userSchema");
const { v4: uuid } = require("uuid");

const response = require("../../utils/response");

const makeAdmin = async (req, res) => {
  try {
    const { projectId, AdminUserName, userName } = req.body;
    //console.log(projectId, AdminUserName, userName);
    if (!projectId || !AdminUserName || !userName) {
      return response(
        400,
        "projectId, AdminUserName and userName is required!",
        null,
        res
      );
    }
    const project = await projectModel.findOne({
      projectId: projectId,
    });
    if (!project) {
      return response(400, "project not found!", null, res);
    }
    const user = await userModel.findOne({
      userName: userName,
    });
    if (!user) {
      return response(400, "user not found!", null, res);
    }
    const admin = await userModel.findOne({
      userName: AdminUserName,
    });
    if (!admin) {
      return response(400, "admin not found!", null, res);
    }
    if (!project.admin.includes(admin._id)) {
      return response(400, "you are not admin of this project!", null, res);
    }
    if (project.admin.includes(user._id)) {
      return response(400, "user is already admin of this project!", null, res);
    }
    let projectAdmin = project.admin;
    projectAdmin = [...projectAdmin, user._id];
    project.admin = projectAdmin;

    project.users = project.users.filter((u) => u.toString() !== user._id.toString());
    await project.save();

    return response(200, "user is now admin of this project", userName, res);
  } catch (err) {
    return response(400, err.message, null, res);
  }
};

module.exports = makeAdmin;
