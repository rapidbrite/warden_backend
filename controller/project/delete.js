const projectModel = require("../../model/projectSchema");
const userModel = require("../../model/userSchema");

const response = require("../../utils/response");
const deleteProject = async (req,res) =>{
    try{
        const {projectId,userName} = req.body;
        const project = await projectModel.findOne({
            projectId : projectId
        }).populate("owner")
        if(!project){
            return response(400,"Project not found!",null,res);
        }
        // owner
        const owner = await userModel.findOne({
            userName : userName
        })
        if(project.owner.userName !== userName){
            return response(400,"You are not authorized to delete this project!",null,res);
        } 
        const index = owner.projects.indexOf(project._id);
        if(index > -1){
            owner.projects.splice(index,1);
        }
        await owner.save();
        
        // for admin
        let admins = project.admin.map(admin => admin.toString());
        admins = admins.slice(1);
        admins.forEach(async admin =>{ 
            const adminUser = await userModel.findOne({
                _id : admin
            })
            const index = adminUser.projects.indexOf(project._id);
            if(index > -1){
                adminUser.projects.splice(index,1);
            }
            await adminUser.save();
        })
        
        // for users
        const usrs = project.users.map(usr => usr.toString());
        usrs.forEach(async usr =>{
            const usrUser = await userModel.findOne({
                _id : usr
            })
            const index = usrUser.projects.indexOf(project._id);
            if(index > -1){
                usrUser.projects.splice(index,1);
            }
            await usrUser.save();
        })
        
        
        
        project.remove();
        return response(200,"Project deleted successfully",null,res);
    }
    catch(err){
        return response(400,err.message,null,res);
    }
}

module.exports = deleteProject;