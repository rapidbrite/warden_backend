const projectModel = require("../../model/projectSchema");
const userModel = require("../../model/userSchema");
const { v4: uuid } = require("uuid");

const response = require("../../utils/response");

const removeUser = async (req, res) => {
  try {
    const { projectId, ByAdminUserName, OnAdminuserName,OnMemberuserName } = req.body;
    //console.log(req.body);
    if (!projectId || !ByAdminUserName || !(OnAdminuserName || OnMemberuserName)) {
        return response(
            400,
            "projectId, ByAdminUserName, OnAdminuserName and OnMemberuserName is required!",
            null,
            res
        );  
    }
    
    const project = await projectModel.findOne({
        projectId: projectId,
    });
    if (!project) {
        return response(400, "project not found!", null, res);
    }
    const Byadmin = await userModel.findOne({
        userName: ByAdminUserName,
    });
    if (!Byadmin) {
        return response(400, "admin not found!", null, res);
    }
    if (!project.admin.includes(Byadmin._id)) {
        return response(400, "you are not admin of this project!", null, res);
    }
    if(OnAdminuserName){
        const Onadmin = await userModel.findOne({
            userName: OnAdminuserName,
        });
        if (!Onadmin) {
            return response(400, "user not found!", null, res);
        }
        if (project.owner.toString() === Onadmin._id.toString()) {
            return response(400, "you can't remove owner of this project!", null, res);
        }
        if (!project.admin.includes(Onadmin._id)) {
            return response(400, "user is not admin of this project!", null, res);
        }
        project.admin = project.admin.filter((u) => u.toString() != Onadmin._id.toString());

        Onadmin.projects = Onadmin.projects.filter((p) => p.toString() != project._id.toString());

        

        const channels = project.channels;
        for (let i = 0; i < channels.length; i++) {
            const channel = channels[i];
            channel.members = channel.members.filter((u) => u != OnAdminuserName);
            
            await channel.save();
        }
        await Onadmin.save();

        
    }
    else if(OnMemberuserName){
        const Onmember = await userModel.findOne({
            userName: OnMemberuserName,
        });
        if (!Onmember) {
            return response(400, "user not found!", null, res);
        }
        if (!project.users.includes(Onmember._id)) {
            return response(400, "user is not member of this project!", null, res);
        }
        project.users = project.admin.filter((u) => u.toString() != Onmember._id.toString());

        Onmember.projects = Onmember.projects.filter((p) => p.toString() != project._id.toString());

        await Onmember.save();

        const channels = project.channels;
        for (let i = 0; i < channels.length; i++) {
            const channel = channels[i];
            channel.members = channel.members.filter((u) => u != OnMemberuserName);
            
            await channel.save();
        }

    }
    await project.save();

    return response(200, "user is removed successfully", null, res);
  }

    catch (err) {
    return response(400, err.message, null, res);
  }
};

module.exports = removeUser;