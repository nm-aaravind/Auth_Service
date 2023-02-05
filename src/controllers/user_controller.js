
const UserService=require("../services/user_service");
const userService=new UserService();
const create=async(req,res)=>{
    try {
        const result=await userService.create(req.body)
        return res.status(200).json({
            data:result,
            success:true,
            message:"Created User"
        })
    } catch (error) {
        return res.status(error.statusCode).json({
            success:false,
            message:error.explanation
        })
    }
}
const getById=async (req,res)=>{
    try {
        const result=await userService.getById(req.params.id);
        return res.status(200).json({
            data:result,
            success:true,
            message:"Got user"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Cannot get user by id"
        })
    }
}
const signIn=async(req,res)=>{
    try {
        const response=await userService.signIn(req.body.email,req.body.password);
        return res.status(200).json({
            data:response,
            success:true,
            message:"Token created"
        })
    } catch (error) {
        return res.status(error.statusCode).json({
            success:false,
            message:error.message,
            explanation:error.explanation
        })
    }
}
const isAuthenticated=async(req,res)=>{
    try {
        const token=req.headers["x-access-token"];
        const response=await userService.isAuthenticated(token);
        return res.status(200).json({
            data:response,
            success:true,
            message:"Authenticated"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong in isAuthenticated"
        })
    }
}
const isAdmin=async(req,res)=>{
    try {
        const result=await userService.isAdmin(req.body.userId);
        return res.status(200).json({
            data:result,
            success:true,
            message:"Fetched whether is admin or not"
        })
    } catch (error) {
        console.log("Got error in isadmin of controller", error)
    }
}
module.exports={
    create,getById,signIn,isAuthenticated,isAdmin
}