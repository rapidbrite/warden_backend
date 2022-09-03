const projectModel = require("../../model/projectSchema");
const messageModel = require("../../model/messageSchema");
const userModel = require("../../model/userSchema");

const response = require("../../utils/response");
const isUserPartOfProject = require("../../utils/isUserPartOfProject");

// socket
const sendMessageSocket = require("../../socket/socketHandler/sendMessage");

const sendMessage = async (req, res) => {
    try{
        const { projectId, text, userName } = req.body;

        const user = await userModel.findOne({ userName });
        if (!user) { 
            return response(400, "User not found",null,res);
        }
        
        const project = await projectModel.findOne({ projectId });
        if (!project) {
            return response(400, "Project not found",null,res);
        }
        const date = new Date();
        const ISTOffset = 330;   // IST offset UTC +5:30
        const dateIST = new Date(date.getTime() + (ISTOffset) * 60000);
        //console.log(dateIST);
        const message = new messageModel({
            text,
            sender: user._id,
            senderUserName: user.userName,
            senderAvatar: user.avatar,
            createdAt: dateIST,
        });
        //console.log(message);
        const part = await isUserPartOfProject(userName, projectId);
        if (!part) {
            return response(400, "User is not part of the project",null,res);
        }
        else {
            project.messages.push(message._id);    
            await message.save();
            await project.save();
            const returnObj = {}
            returnObj.text = message.text;
            returnObj.senderUserName = message.senderUserName;
            returnObj.senderAvatar = message.senderAvatar;
            returnObj.createdAt = message.createdAt;
            sendMessageSocket(returnObj, userName, projectId);
            return response(200, "Message sent",returnObj,res);
        }
    }
    catch (err) {
        return response(400, err.message, null, res);
    }
}

module.exports = sendMessage