// check if user is part of particular project or not
const userModel = require("../model/userSchema")
const channelModel = require("../model/channelSchema");

const isUserPartOfChannel = async (userName, channelId) => {
    try {
        const channel = await channelModel.findOne({ channelId });
        if (!channel) {
            return false;
        }
        const user = await userModel.findOne({ userName });
        if (!user) {
            return false;
        }
        
        if (channel.members.includes(userName) ) {
            return true;
        }
        return false;
    } catch (err) {
        return false;
    }
}

module.exports = isUserPartOfChannel;