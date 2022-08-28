const channelModel = require("../../model/channelSchema");
const userModel = require("../../model/userSchema");
const projectModel = require("../../model/projectSchema");
//const taskStatusModel = require("../../model/taskStatusSchema");




// utils
const isUserAdminOfProject = require("../../utils/isUserAdminOfProject"); 
const response = require("../../utils/response");



const updateChannel = async (req, res) => {
    try{
        const { userName, channelName, channelDescription, channelType, channelId, projectId, members } = req.body;
        //console.log(req.body);
        if (!userName || !channelId)  { 
            return response(400, "Please provide all the required fields", null,res);
        }
        
        const user = await userModel.findOne({ userName });
        if (!user) {
            return response(400, "User not found",null,res);
        }

        const channel = await channelModel.findOne({ channelId });
        if (!channel) {
            return response(400, "Channel not found",null,res);
        }

        const part = await isUserAdminOfProject(userName, projectId);
        if (!part) {
            return response(400, "User is not Admin of the project",null,res);
        }
        if(channelName)
        channel.channelName = channelName;

        if(channelDescription)
        channel.channelDescription = channelDescription;

        if(channelType)
        channel.channelType = channelType;

        if(members)
        channel.members = members;
        
        await channel.save();
        
        const returnObject = {
            channelName : channel.channelName,
            channelDescription : channel.channelDescription,
            channelType : channel.channelType,
            members : channel.members,
            channelId : channel.channelId,
            project : channel.project,
            channelKey : channel.channelKey,
        }
        return response(200, "Channel updated successfully", returnObject,res);
    }
    catch (err) {
        return response(400, err.message, null, res);
    }
}

module.exports = updateChannel;