'use strict';
const bcrypt = require('bcryptjs')
module.exports = {
  async up (queryInterface, Sequelize) {

    return await queryInterface.bulkInsert('Users' , [
      {
        firstName:"Tom",
        lastName:"xyz",
        email:'tom@user.io',
        hashedPassword: bcrypt.hashSync('password1')
      },
      {
        firstName:"Ryan",
        lastName:"xyz",
        email: 'ryan@user.io',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName:"Varsha",
        lastName:"Gade",
        email: 'varsha@user.io',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName:"Javier",
        lastName:'xyz',
        email: 'javier@user.io',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        firstName:"Rakesh",
        lastName:"xyz",
        email: 'rakesh@user.io',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        firstName:"Bill",
        lastName:"Adam",
        email: 'bill@user.io',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        firstName:"Katy",
        lastName:"xyz",
        email: 'katy@user.io',
        hashedPassword: bcrypt.hashSync('password7')
      },
      {
        firstName:'Jensen',
        lastName:"xyz",
        email: 'jensen@user.io',
        hashedPassword: bcrypt.hashSync('password8')
      },
    ],{})

  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op
    return await queryInterface.bulkDelete('Users', {
      email:{[Op.in]:['tom@user.io','ryan@user.io','varsha@user.io','javier@user.io','rakesh@user.io','bill@user.io','katy@user.io','jensen@user.io']}
    },{})
  }
};
