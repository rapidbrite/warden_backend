const projectModel = require("../../model/projectSchema");
const userModel = require("../../model/userSchema");
const { v4: uuid } = require("uuid");

const response = require("../../utils/response");

const removeAdmin = async (req, res) => {
  try {
    const { projectId, ByUserName, OnuserName } = req.body;
    //console.log(projectId, ByUserName, OnuserName);
    if (!projectId || !ByUserName || !OnuserName) {
        return response(
            400,
            "projectId, ByUserName and OnuserName is required!",
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
    const Onadmin = await userModel.findOne({
      userName: OnuserName,
    });
    if (!Onadmin) {
      return response(400, "user not found!", null, res);
    }
    if (project.owner.toString() === Onadmin._id.toString()) {
      return response(400, "you can't remove owner of this project as a admin!", null, res);
    }

    const Byadmin = await userModel.findOne({
      userName: ByUserName,
    });
    if (!Byadmin) {
      return response(400, "admin not found!", null, res);
    }
    if (!project.admin.includes(Byadmin._id)) {
      return response(400, "you are not admin of this project!", null, res);
    }
    
    if (!project.admin.includes(Onadmin._id)) {
        return response(400, "user is not admin of this project!", null, res);
    }
    const projectAdmin = project.admin;
    project.admin = projectAdmin.filter((u) => u.toString() !== Onadmin._id.toString());
    project.users = [...project.users, Onadmin._id];


    await project.save();

    return response(200, "user is now admin of this project", OnuserName, res);
  } catch (err) {
    return response(400, err.message, null, res);
  }
};

module.exports = removeAdmin;
