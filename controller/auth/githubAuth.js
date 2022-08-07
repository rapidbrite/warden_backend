const response = require("../../utils/response");
const userModel = require("../../model/userSchema");
const createJWT = require("../../middleware/auth/create");

const githubAuth = async (req,res) =>{
    try{
        const body = req.user;
        const user = await userModel.findOne({
            userName : body.login
        })
        const token = createJWT(body.login);
        if(!user){
            const newUser = new userModel({
                userName : body.login,
                name : body.name,
                email : body.email,
                avatar : body.avatar_url,
                projects : [],
                invitations : []
            })
            await newUser.save();
            res.cookie("token", token, {
                httpOnly: true,
                expiresIn: 604800000,
            });
            return response(200,"User Logged in successfully",newUser,res);         
        }
        
        user.userName = body.login;
        user.name = body.name;
        user.email = body.email;
        user.avatar = body.avatar_url;
        await user.save();
        
        res.cookie("token", token, {
                httpOnly: true,
                expiresIn: 604800000,
        });
        return response(200,"User Logged in successfully",user,res);
    }
    catch(err){
        return response(400,err.message,null,res);
    }
}
module.exports = githubAuth;