const userModel = require('../../model/userSchema.js')
const response = require("../../utils/response");
const jwt = require('jsonwebtoken');

const getUserData = async (req, res) => { 
    try {
        const { token } = req.body;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { userName } = decoded;
        const user = await userModel.findOne({ userName })
        if(!user) {
            return response(400, "User not found", null, res);
        }
        return response(200, "User found", user, res);
    }
    catch(err){
        return response(400, err.message, null, res);
    } 
}

module.exports = getUserData;