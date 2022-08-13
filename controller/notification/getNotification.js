
const userModel = require("../../model/userSchema");
const response = require("../../utils/response");

const getNotification = async (req, res) => {
    try {
        const { userName } = req.body;
        if (!userName) { 
            return response(400, "User name is required",null,res);
        }
        const user = await userModel.findOne({
            userName: userName
        }).populate("notifications");
        if (!user) {
            return response(400, "User not found", null, res);
        }

        return response(200, "Notification found", user.notifications, res);
        
    } catch (err) {
        return response(400, err.message, null, res);
    }
}

module.exports = getNotification;