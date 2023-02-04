const UserRepository=require("../repository/user_repository");
const jwt=require("jsonwebtoken")
const {JWT_KEY}=require("../config/serverConfig")
const bcrypt=require("bcrypt")
class UserService{
    constructor(){
        this.UserRepository=new UserRepository();
    }
    async create(data){
        try {
            const result=await this.UserRepository.create(data);
            return result;
        } catch (error) {
            console.log("Got error in service of create")
        }
    }
    async destory(userId){
        try {
            await this.UserRepository.destory(userId);
            return true;
        } catch (error) {
            console.log("Got error in service of destroy")
        }
    }
    async getById(userId){
        try {
            console.log("Here in service",userId)
            const result=await this.UserRepository.getById(userId);
            return result;
        } catch (error) {
            console.log("Got error in getbyid service")
        }
    }
    createToken(user){
        try {
            const result=jwt.sign(user,JWT_KEY,{expiresIn:"1d"});
            return result;
        } catch (error) {
            console.log("Error in creating token")
            throw error;
        }
    }
    verifyToken(token){
        try {
            const result=jwt.verify(token,JWT_KEY);
            return result
        } catch (error) {
            console.log("Got error in verifying token")
            throw error;
        }
    }

    checkPassword(inputPass,encryptedPass){
        try {
            return bcrypt.compareSync(inputPass,encryptedPass)
        } catch (error) {
            console.log("Something went wrong in checkpassword");
            throw error;
        }
    }
    async isAuthenticated(token){
        const response=this.verifyToken(token);
        if(!response){
            throw {error:"Cannot verify token"}
        }
        const user=await this.UserRepository.getById(response.id);
        if(!user){
            throw {error:"No user with given details"}
        }
        return user.id;

    }
    async signIn(email,plainpassword){
        try {
            const result=await this.UserRepository.getByEmail(email);
            const passwordmatch=this.checkPassword(plainpassword,result.password);
            if(!passwordmatch){
                console.log("Password doesnt match");
                throw {error:"incorrect password"};
            }
            const newJWT=this.createToken({email:result.email,id:result.id});
            return newJWT;
        } catch (error) {
            console.log("Got error in sign in")
            throw error;
        }
    }
}
module.exports=UserService;