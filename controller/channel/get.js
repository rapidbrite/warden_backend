const projectModel = require("../../model/projectSchema");
const isUserPartOfChannel = require("../../utils/isUserPartOfChannel");
const response = require("../../utils/response");
const channelModel = require("../../model/channelSchema");

const getChannel = async (req,res) =>{
    try{
        const {channelId,userName} = req.body;
        //console.log(channelId,userName);
        if(!channelId){
            return response(400,"Channel Id is required!",null,res);
        }
        const channel = await channelModel.findOne({
            channelId: channelId
        });
        if(!channel){
            return response(400,"Channel Not Found",null,res);
        }
        

        const part = await isUserPartOfChannel(userName,channelId);
        if(!part){
            return response(400,"User is not part of the channel",null,res);
        }

        let returnObj = {};
        returnObj.channelId = channel.channelId;
        returnObj.project = channel.project;
        returnObj.channelName = channel.channelName;
        returnObj.channelDescription = channel.channelDescription;
        returnObj.channelType = channel.channelType;
        returnObj.members = channel.members;
        returnObj.channelKey = channel.channelKey;

        //console.log(returnObj);

        return response(200,"Channel found successfully",returnObj,res);
    }
    catch(err){
        return response(400,err.message,null,res);
    }
}

module.exports = getChannel;