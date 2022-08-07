const projectModel = require("../../model/projectSchema");
const userModel = require("../../model/userSchema");
const { v4: uuid } = require('uuid');

const response = require("../../utils/response")

const createProject = async (req,res) =>{
    try{
        const body = req.body;
        const {userName,name,description,category} = body;
        
        if(!userName || !name){
            return response(400,"userName and name is required!",null,res);
        }
        const owner = await userModel.findOne({
            userName : userName
        })
        if(!owner){
            return response(400,"user not found!",null,res);
        }
        
        const newProject = new projectModel({
            projectId : uuid(),
            projectIcon : null,
            projectKey : name.slice(0,3).toUpperCase(),
            name,
            description : description || null,
            category : category || null,
            owner : owner._id,
            admin : [owner._id],
            users :[]
        })
        await newProject.save();
        
        let userProjects = owner.projects;
        userProjects = [...userProjects, newProject._id]
        owner.projects = userProjects;
        await owner.save();
        
        return response(200,"Project created successfully",newProject,res);
    }
    catch(err){
        return response(400,err.message,null,res);
    }
}

module.exports = createProject;