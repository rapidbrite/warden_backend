const response = require("../../utils/response");
const userModel = require("../../model/userSchema");
const invitationModel = require("../../model/invitationsSchema");
const projectModel = require("../../model/projectSchema");

const searchUser = async (req, res) => {
    try {
        const { userName ,projectId} = req.body;
        const users = await userModel.fuzzySearch(userName);        
        const filteredUsers = [];

        const project = await projectModel.findOne({projectId}).populate("owner");
        const owner = project.owner.userName;

        for (let i = 0; i < users.length; i++) {
            
            if (users[i].userName === owner) continue;
            const obj = {}
            
            obj.userName = users[i].userName;
            obj.name = users[i].name;
            obj.avatar = users[i].avatar;
            const invitation = await invitationModel.findOne({
                userName: users[i].userName,
                projectId: projectId
            })
            
            if (!invitation) {
                obj.inviteStatus = "new";
            }
            else {
                obj.inviteStatus = invitation.status;
            }
            filteredUsers.push(obj);
        }

        return response(200,"success",filteredUsers,res);
    }


    catch (err) {
        response(400, err.message, null, res);
    }
}

module.exports = searchUser;