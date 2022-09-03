const response = require("../../utils/response");
const userModel = require("../../model/userSchema");
const createJWT = require("../../middleware/auth/create");

const makeReturnObj = (user,token) => {
    const returnObj = {};
    returnObj.userName = user.userName;
    returnObj.name = user.name;
    returnObj.email = user.email;
    returnObj.avatar = user.avatar;
    returnObj.projects = user.projects;
    returnObj.invitations = user.invitations;
    returnObj.token = token;
    
    return returnObj;

}

const githubAuth = async (req,res) =>{
    try{
        //console.log("hit..",req.user);
        if(req.user){
            const body = req.user._json;
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
                const returnObj = makeReturnObj(user,token);
                return response(200,"User Logged in successfully",returnObj,res);         
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

            const returnObj = makeReturnObj(user,token);
            return response(200,"User Logged in successfully",returnObj,res);
        }
        return response(400,"Failed",null,res);
    }
    catch(err){
        return response(400,err.message,null,res);
    }
}
module.exports = githubAuth;