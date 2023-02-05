'use strict';
const {
  Model
} = require('sequelize');
const bcrypt=require("bcrypt")
const {SALT}=require("../config/serverConfig")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role,{
        through:'User_Roles'
      })
    }
  }
  User.init({
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        isEmail:true
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[6,50]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(async (data)=>{
    console.log(data);
    const encryptedpass=bcrypt.hashSync(data.password,SALT);
    data.password=encryptedpass;
    console.log(data);
  })
  return User;
};