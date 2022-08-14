const projectModel = require("../../model/projectSchema");
const isUserPartOfProject = require("../../utils/isUserPartOfProject");
const response = require("../../utils/response");

const filterData = (user) => {
    const filterData = {};
    filterData.userName = user.userName;
    filterData.avatar = user.avatar;
    return filterData;
}

const getProject = async (req,res) =>{
    try{
        const {projectId,userName} = req.body;
        if(!projectId){
            return response(400,"Project Id is required!",null,res);
        }
        const project = await projectModel.findOne({
            projectId: projectId
        }).populate("owner").populate("admin").populate("users");
        
        if(!project){
            return response(400,"Project Not Found",null,res);
        }

        const part = await isUserPartOfProject(userName,projectId);
        if(!part){
            return response(400,"User is not part of the project",null,res);
        }

        const returnObj = {};
        returnObj.name = project.name;
        returnObj.projectId = project.projectId;
        returnObj.projectIcon = project.projectIcon;
        returnObj.owner = filterData(project.owner);
        returnObj.admins = project.admin.map(admin => filterData(admin));
        returnObj.users = project.users.map(user => filterData(user));

        

        return response(200,"Project found successfully",returnObj,res);
    }
    catch(err){
        return response(400,err.message,null,res);
    }
}

module.exports = getProject;
