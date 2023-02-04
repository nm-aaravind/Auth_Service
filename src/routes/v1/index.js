const express=require("express");
const router=express.Router();
const UserController=require("../../controllers/user_controller")
const {AuthRequestValidators}=require("../../middlewares/index")

router.post("/signup",AuthRequestValidators.validateUserAuth,UserController.create);
router.get("/user/:id",UserController.getById)
router.post("/signin",AuthRequestValidators.validateUserAuth,UserController.signIn)
module.exports=router;