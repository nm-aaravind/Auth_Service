const validateUserAuth=(req,res,next)=>{
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            success:false,
            message:"Validation error",
            error:"Email or password missing"
        })
    }
    next()
}
const validateIsAdmin=(req,res,next)=>{
    if(!req.body.userId){
        return res.status(400).json({
            success:false,
            message:"No userId field"
        })
    }
    next();
}
module.exports={
    validateUserAuth,validateIsAdmin
}