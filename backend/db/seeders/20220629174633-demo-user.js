'use strict';
const bcrypt = require('bcryptjs')
module.exports = {
  async up (queryInterface, Sequelize) {

    return await queryInterface.bulkInsert('Users' , [
      {

        userName:'Demo-lition',
        email:'demo@user.io',
        hashedPassword: bcrypt.hashSync('password')
      },
      {

        userName: 'FakeUser',
        email: 'user1@user.io',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {

        userName: 'FakeUser',
        email: 'user2@user.io',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ],{})

  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op
    return await queryInterface.bulkDelete('Users', {
      userName:{[Op.in]:['Demo-lition','FakeUser1','FakeUser2']}
    },{})
  }
};
