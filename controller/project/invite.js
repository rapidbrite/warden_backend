// models
const invitationModel = require("../../model/invitationsSchema");
const projectModel = require("../../model/projectSchema");
const userModel = require("../../model/userSchema");
const notificationModel = require("../../model/notificationSchema");
const { v4 : uuid } = require('uuid');

const response = require("../../utils/response");

// socket
const sendNotification = require("../../socket/socketHandler/sendNotification");

const inviteUserToProject = async (req,res) =>{
    try{
        const { userName, projectId, senderId } = req.body; 
        if (!userName || !projectId || !senderId) { 
            return response(400, "userName, projectId, senderId are required", null,res);
        }
        const project = await projectModel.findOne({
            projectId : projectId
        })
        if(!project){
            return response(400,"Project not found!",null,res);
        }
        const user = await userModel.findOne({
            userName : userName
        });
        if(!user){
            return response(400,"User not found!",null,res);
        }
        const sender = await userModel.findOne({
            userName : senderId
        })
        if (!sender) { 
            return response(400, "Sender not found", res);
        }
        const invitation = new invitationModel({
            id : projectId+userName,
            projectName : project.name,
            projectId : projectId,
            userName : userName,
            senderId: senderId,
            senderName : sender.name,
            status : "pending"
        });
        const notification = new notificationModel({
            id : uuid(),
            invitation : invitation._id,
            status : "unread",
            title : "Invitation",
            Message : "You have been invited to join "+project.name+" project by "+sender.name,
        });
        
        await notification.save();
        await invitation.save();

        project.invitations.push(invitation._id);
        user.invitations.push(invitation._id);
        user.notifications.push(notification._id);
        
        await project.save();
        await user.save();

        sendNotification(notification,userName)
        
        return response(200,"User invited successfully",null,res);  
    }
    catch (err) {
        return response(400, err.message, null, res);
    }
}

module.exports = inviteUserToProject;