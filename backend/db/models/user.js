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
      const{id,userName,email} = this
      return {id,userName,email}
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
    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            userName: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }

    //signUp method
    static async signup ({ userName,email,password}) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create(
        {
          userName,
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
    userName: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        len:[4,30],
        isNotEmail(value){
          if(Validator.isEmail(value)) {
            throw new Error('Username Cannot be an email')
          }

        }
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[3,256]
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
        exclude:['hashedPassword','email','updatedAt','createdAt']
      }
    },
    scopes:{
      currentUser:{
        attributes:{
          exclude:['hashedPassword']
        }
      },
      loginUser:{
        attributes:{}
      }
    }

  });
  return User;
};
