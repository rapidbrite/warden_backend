// check if user is part of particular project or not
const userModel = require("../model/userSchema")
const projectModel = require("../model/projectSchema")

const isUserPartOfProject = async (userName, projectId) => {
    try {
        const project = await projectModel.findOne({ projectId });
        if (!project) {
            return false;
        }
        const user = await userModel.findOne({ userName });
        if (!user) {
            return false;
        }
        
        if (project.users.includes(user._id) || project.admin.includes(user._id)) {
            return true;
        }
        return false;
    } catch (err) {
        return false;
    }
}

module.exports = isUserPartOfProject;