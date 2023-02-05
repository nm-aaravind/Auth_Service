const ValidationError = require("../utils/validation-error")
const ClientError=require("../utils/client_error");
const {StatusCodes}=require("http-status-codes")
const { User, Role } = require("../models/index.js")
class UserRepository {
    async create(data) {
        try {
            const result = await User.create(data);
            return result;
        } catch (error) {
            if (error.name == "SequelizeValidationError") {
                throw new ValidationError(error);
            }
        }
    }
    async destroy(userId) {
        try {
            await User.destroy({
                where: {
                    id: userId
                }
            })
            return true;
        } catch (error) {
            console.log("Got error in repo of delete")
        }
    }
    async getById(userId) {
        try {
            const result = await User.findByPk(userId, {
                attributes: ['id', 'email']
            });
            return result;
        } catch (error) {
            console.log("Got error in getbyid repo")
        }
    }
    async getByEmail(emailId) {
        try {
            const result = await User.findOne({
                where: {
                    email: emailId
                }
            })
            if(!result){ 
                throw new ClientError("Attribute Not found","Invalid email entered","Please check the email entered",StatusCodes.NOT_FOUND)
            }
            return result;
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    async isAdmin(userId) {
        try {
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where: {
                    name: "ADMIN"
                }
            })
            return user.hasRole(adminRole)
        } catch (error) {
            console.log(error, "in repo of isadmin")
        }
    }

}
module.exports = UserRepository;