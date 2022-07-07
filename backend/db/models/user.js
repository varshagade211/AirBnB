'use strict';
const bcrypt = require('bcryptjs')
const { Validator} = require('sequelize')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    toSafeObject() {
      const{id,userName,firstName,lastName,email} = this
      return {id,userName,firstName,lastName,email}
    }
    //validate password using bcrypt
    validatePassword(password) {
      const isValid = bcrypt.compareSync(password,this.hashedPassword.toString());
      return isValid
    }
    //getcurrentUserid
    static getCurrentUserId(id){
       return User.scope('currentUser').findByPk(id)
    }
    //login use
    static async login({ email, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          email: email
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }

    //signUp method
    static async signup ({firstName,lastName,email,password}) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create(
        {
          firstName,
          lastName,
          email,
          hashedPassword
        }
      )
      return await User.scope('currentUser').findByPk(user.id)
    }

    //associate models
    static associate(models) {
       User.hasMany(models.Booking,{foreignKey:'userId'})
       User.hasMany(models.Spot,{foreignKey:'ownerId'})
       User.hasMany(models.Review,{foreignKey:'userId'})
    }
  }
  User.init({
    firstName:{
       type:DataTypes.STRING,
       allowNull:false,
    },
    lastName:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    email: {
      type:DataTypes.STRING,
      unique:true,
      allowNull:false,
      validate:{
        len:[3,256],
        isEmail:true
      }
    },
    hashedPassword: {
      type:DataTypes.STRING.BINARY,
      allowNull:false,
      validate:{
        len:[60,60]
      }

    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope:{
      attributes:{
        exclude:['hashedPassword','updatedAt','createdAt']
      }
    },
    scopes:{
      currentUser:{
        attributes:{
          exclude:['hashedPassword','createdAt','updatedAt']
        }
      },
      loginUser:{
        attributes:{}
      }
    }

  });
  return User;
};
