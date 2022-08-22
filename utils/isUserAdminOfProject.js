// check if user is Admin of particular project or not
const userModel = require("../model/userSchema")
const projectModel = require("../model/projectSchema")

const isUserAdminOfProject = async (userName, projectId) => {
    try {
        const project = await projectModel.findOne({ projectId });
        if (!project) {
            return false;
        }
        const user = await userModel.findOne({ userName });
        if (!user) {
            return false;
        }
        
        if (project.admin.includes(user._id)) {
            return true;
        }
        return false;
    } catch (err) {
        return false;
    }
}

module.exports = isUserAdminOfProject;