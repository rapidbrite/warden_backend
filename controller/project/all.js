const projectModel = require("../../model/projectSchema");
const userModel = require("../../model/userSchema");

// response
const response = require("../../utils/response");

const makeResponseData = (data) => {
    const responseData = {};
    responseData.projectId = data.projectId;
    responseData.projectIcon = data.projectIcon;
    responseData.name = data.name;

    return responseData;
}

const allProjects = async (req,res) =>{
    try{
        const { userName } = req.body;
       if(!userName){
           return response(400,"User Not Found",null,res);
       }
        const user = await userModel.findOne({
            userName : userName
        })
        if(!user){
            return response(400,"User Not Found",null,res);
        }
        let projectIDs = user.projects.map(project => project.toString());
        let projectids = await projectModel.find({
            _id : {$in : projectIDs} 
        }).select("projectId projectIcon name"); 
        projectids = projectids.map(project => makeResponseData(project));
        
        return response(200,"Projects found successfully",projectids,res);
    }
    catch(err){
        return response(400,err.message,null,res);
    }
}

module.exports = allProjects;