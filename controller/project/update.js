const projectModel = require("../../model/projectSchema");
const userModel = require("../../model/userSchema");
const { v4: uuid } = require('uuid');

const response = require("../../utils/response")

const updateProject = async (req,res) =>{
    try{
        const body = req.body;
        const {userName,name,description,category,projectId} = body;
        
        if(!userName || !name){
            return response(400,"userName and name is required!",null,res);
        }
        const admin = await userModel.findOne({
            userName : userName
        })
        if(!admin){
            return response(400,"user not found!",null,res);
        }
        const project = await projectModel.findOne({
            projectId : projectId
        })
        if(!project){
            return response(400,"project not found!",null,res);
        }
        if(!project.admin.includes(admin._id)){
            return response(400,"you are not admin of this project!",null,res);
        }
        if(name){
            project.name = name;
        }
        if(description){
            project.description = description;
        }
        if(category){
            project.category = category;
        }
        await project.save();

        
        return response(200,"Project created successfully",project.name,res);
    }
    catch(err){
        return response(400,err.message,null,res);
    }
}

module.exports = updateProject;