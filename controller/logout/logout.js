const {response} = require("../../utils/response");

const logout = (req,res) =>{
    try{
        return response(400,"User not logged in!", null, res);
    }
    catch(err){
        return response(400,err.message,null,res);
    }
}

module.exports = logout;