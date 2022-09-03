const response = require("../../utils/response");
const userModel = require("../../model/userSchema");
const invitationModel = require("../../model/invitationsSchema");
const projectModel = require("../../model/projectSchema");

const searchUser = async (req, res) => {
  try {
    const { userName, projectId } = req.body;
    const users = await userModel.fuzzySearch(userName);
    const filteredUsers = [];

    const project = await projectModel.findOne({ projectId }).populate("owner");
    const owner = project.owner.userName;

    for (let i = 0; i < users.length; i++) {
      if (users[i].userName === owner) continue;
      const obj = {};

      obj.userName = users[i].userName;
      obj.name = users[i].name;
      obj.avatar = users[i].avatar;
      //console.log(obj);
      const invitation = await invitationModel.find({
        userName: users[i].userName,
        projectId: projectId,
      });
      //console.log(invitation)
      if (invitation.length < 1) {
        obj.inviteStatus = "new";
      } else if (invitation.length > 0) {
        let status = "latest";
        for (let i = 0; i < invitation.length; i++) {
          if (invitation[i].status === "accepted") {
            const user = await userModel.findOne({
              userName: invitation[i].userName,
            });
            if (!user?.projects?.includes(project._id)) status = "new";
          }
        }
        obj.inviteStatus = status === "new" ? "new" : status;
      }

      filteredUsers.push(obj);
    }
    //console.log(filteredUsers);

    return response(200, "success", filteredUsers, res);
  } catch (err) {
    response(400, err.message, null, res);
  }
};

module.exports = searchUser;
