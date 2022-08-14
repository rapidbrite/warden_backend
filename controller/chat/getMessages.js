const projectModel = require("../../model/projectSchema");
const messageModel = require("../../model/messageSchema");
const userModel = require("../../model/userSchema");

const response = require("../../utils/response");
const isUserPartOfProject = require("../../utils/isUserPartOfProject");

const filterData = (message) => {
    const filteredMessage = {}
    filteredMessage.text = message.text;
    filteredMessage.senderUserName = message.senderUserName;
    filteredMessage.senderAvatar = message.senderAvatar;
    filteredMessage.createdAt = message.createdAt;
    return filteredMessage;
}

const getMessages = async (req, res) => {
    try {
        const { projectId,userName } = req.body;

        const project =await projectModel.findOne({ projectId }).populate("messages");
        if (!project) {
            return response(400, "Project not found",null,res);
        }
        const user = await userModel.findOne({ userName });
        if (!user) {
            return response(400, "User not found",null,res);
        }
        const part = await isUserPartOfProject(userName, projectId);
        if (!part) {
            return response(400, "User is not part of the project",null,res);
        }
        else {
            
            let messages = project.messages.reverse().slice(0, 100) || [];
            //messages.populate("sender");
            //console.log(messages);
            messages = messages.reverse();

            const returnObj = messages.map((message) => filterData(message));
            
            return response(200, "Messages found",returnObj,res);
        }
    }
    catch(err){
        return response(400, err.message, null, res);
    }
}

module.exports = getMessages;