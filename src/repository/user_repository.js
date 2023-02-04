const { User }=require("../models/index.js")
class UserRepository{
    async create(data){
        try {
            console.log(data);
            const result=await User.create(data);
            return result;
        } catch (error) {
            console.log("Got error in repo of create")
        }
    }
    async destroy(userId){
        try {
            await User.destroy({
                where:{
                    id:userId
                }
            })
            return true;
        } catch (error) {
            console.log("Got error in repo of delete")
        }
    }
    async getById(userId){
        try {
            const result=await User.findByPk(userId,{
                attributes:['id','email']
            });
            return result;
        } catch (error) {
            console.log("Got error in getbyid repo")
        }
    }
    async getByEmail(emailId){
        try {
            const result=await User.findOne({
                where:{
                    email:emailId
                }
            })
            return result;
        } catch (error) {
            console.log("Got error in getbyemail repo")
            throw error
        }
    }
}
module.exports=UserRepository;