
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
        return res.status(500).json({
            success:false,
            message:"Cannot create User"
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
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Cannot sign In"
        })
    }
}
module.exports={
    create,getById,signIn
}