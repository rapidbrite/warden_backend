const userModel = require("../../model/userSchema.js");
const notificationModel = require("../../model/notificationSchema.js");
const invitationModel = require("../../model/invitationsSchema.js");
const projectModel = require("../../model/projectSchema.js");

const response = require("../../utils/response.js");

const acceptInvite = async (req, res) => {
  try {
    const { userName, notificationId, invitationId } = req.body;
    const user = await userModel.findOne({ userName });
    if (!user) {
      return response(400, "User not found", null, res);
    }
    const notification = await notificationModel.findOne({
      id: notificationId,
    });
    if (!notification) {
      return response(400, "Notification not found", null, res);
    }
    const invitation = await invitationModel.findOne({ _id: invitationId });
    if (!invitation) {
      return response(400, "Invitation not found", null, res);
    }

    const project = await projectModel.findOne({ projectId: invitation.projectId });
    if (!project) {
        return response(400, "Project not found", null, res);
        }

      const userProjects = [...user.projects, project._id];
      user.projects = userProjects;
      
      notification.status = "read";
      
      invitation.status = "accepted";

      //console.log("users",project.users);
      
      const projectUsers = [...project.users, user._id];
      project.users = projectUsers;

        
      await user.save();
      await notification.save();
      await invitation.save();
      await project.save();

      const responseObj = {};
      responseObj.name = project.name;
      responseObj.projectId = project.projectId;
      responseObj.projectIcon = project.projectIcon;
      return response(200, "Invitation accepted", responseObj, res);

  } catch (err) {
    return response(400, err.message, null, res);
  }
};

module.exports = acceptInvite;