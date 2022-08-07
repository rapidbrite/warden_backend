const projectModel = require("../../model/projectSchema");
const response = require("../../utils/response");

const getProject = async (req,res) =>{
    try{
        const {projectId} = req.body;
        if(!projectId){
            return response(400,"Project Id is required!",null,res);
        }
        const project = await projectModel.findOne({
            projectId : projectId
        }).select("projectId projectIcon projectKey name description category");
        if(!project){
            return response(400,"Project Not Found",null,res);
        }
        return response(200,"Project found successfully",project,res);
    }
    catch(err){
        return response(400,err.message,null,res);
    }
}

module.exports = getProject;
