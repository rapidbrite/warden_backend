const channelModel = require("../../model/channelSchema");
const userModel = require("../../model/userSchema");
const projectModel = require("../../model/projectSchema");
const taskStatusModel = require("../../model/taskStatusSchema");

const { v4: uuid } = require("uuid");


// utils
const isUserAdminOfProject = require("../../utils/isUserAdminOfProject"); 
const response = require("../../utils/response");
const keyIncrementer = require("../../utils/keyIncrementer");


const createChannel = async (req, res) => {
    try{
        const { userName, channelName, channelDescription, channelType, projectId, members } = req.body;
        //console.log(req.body);
        if (!userName || !channelName || !projectId) { 
            return response(400, "Please provide all the required fields", null,res);
        }
        
        const user = await userModel.findOne({ userName });
        if (!user) {
            return response(400, "User not found",null,res);
        }

        const project = await projectModel.findOne({ projectId });
        if (!project) {
            return response(400, "Project not found",null,res);
        }

        const part = await isUserAdminOfProject(userName, projectId);
        if (!part) {
            return response(400, "User is not Admin of the project",null,res);
        }
        let currentkey = project.currentChannelKey;
        let channelKey = keyIncrementer(currentkey);
        project.currentChannelKey = channelKey;
        //console.log("step 1");
        const channel = new channelModel({
            channelId : uuid(),
            channelName,
            channelKey,
            channelDescription : channelDescription || "",
            channelType : channelType || "",
            project : project._id,
            members : members,
            taskStatus: []
        });
        project.channels.push(channel._id);

        //console.log(channel);

        const taskStatus1 = new taskStatusModel({
            channelId : channel._id,
            taskStatusName : "ToDo",
            taskArray : [],
        });
        //console.log(taskStatus1);
        channel.taskStatus.push(taskStatus1._id);

        const taskStatus2 = new taskStatusModel({
            channelId : channel._id,
            taskStatusName : "InProgress",
            taskArray : [],
        });
        channel.taskStatus.push(taskStatus2._id);

        const taskStatus3 = new taskStatusModel({
            channelId : channel._id,
            taskStatusName : "Done",
            taskArray : [],
        });
        channel.taskStatus.push(taskStatus3._id);

        //console.log(channel.taskStatus);

        await taskStatus1.save();
        await taskStatus2.save();
        await taskStatus3.save();
        await channel.save();
        await project.save();
        
        return response(200, "Channel created successfully", channel,res);
    }
    catch (err) {
        return response(400, err.message, null, res);
    }
}

module.exports = createChannel;