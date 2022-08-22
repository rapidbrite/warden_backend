const userModel = require("../../model/userSchema");
const projectModel = require("../../model/projectSchema");

// utils
const response = require("../../utils/response")
const isUserPartOfProject = require("../../utils/isUserPartOfProject");
const getAll = async (req, res) => { 
    try{
        //get all channels in project
        const { userName, projectId } = req.body;
        // console.log(req.body);
        if (!userName || !projectId) {
            return response(400, "Please provide all the required fields", null,res);
        }
        const user = await userModel.findOne({ userName });
            
        if (!user) {
            return response(400, "User not found",null,res);
        }

        const project = await projectModel.findOne({ projectId }).populate("channels");
        if (!project) {
            return response(400, "Project not found",null,res);
        }
        const channels = project.channels;
        
        const part = await isUserPartOfProject(userName, projectId);
        if (!part) {
            return response(400, "User is not part of the project",null,res);
        }

        const responseObj = [];
        for (let i = 0; i < channels.length; i++) {
            const channel = channels[i];
            const channelObj = {
                channelId : channel.channelId,
                channelName : channel.channelName,
                channelKey : channel.channelKey,                
            }
            responseObj.push(channelObj);
        }

        return response(200, "Success", responseObj,res);

    }
    catch(err){
        return response(400,err.message,null,res);
    }
}


module.exports = getAll;