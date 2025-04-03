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
        console.log("hit..", req.user);
        console.log("session:", req.session);
        console.log("cookies:", req.cookies);
        
        if(!req.user) {
            console.error("GitHub authentication failed: req.user is undefined");
            return response(401, "Authentication failed - no user data", null, res);
        }
        
        const body = req.user._json;
        const user = await userModel.findOne({
            userName : body.login
        });
        
        const token = createJWT(body.login);
        
        if(!user){
            const newUser = new userModel({
                userName : body.login,
                name : body.name,
                email : body.email,
                avatar : body.avatar_url,
                projects : [],
                invitations : []
            });
            await newUser.save();
            const returnObj = makeReturnObj(newUser, token);  // Changed from user to newUser
            
            // Set cookie
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
                sameSite: 'lax',  // Helps with CSRF protection
                maxAge: 604800000, // 7 days
            });
            
            return response(200, "User created and logged in successfully", returnObj, res);         
        }
        
        // Update existing user info
        user.userName = body.login;
        user.name = body.name;
        user.email = body.email;
        user.avatar = body.avatar_url;
        await user.save();
        
        // Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
            sameSite: 'lax',  // Helps with CSRF protection
            maxAge: 604800000, // 7 days
        });

        const returnObj = makeReturnObj(user, token);
        return response(200, "User logged in successfully", returnObj, res);
    }
    catch(err){
        console.error("GitHub auth error:", err);
        return response(500, err.message, null, res);
    }
}

module.exports = githubAuth;