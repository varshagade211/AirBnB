'use strict';
const bcrypt = require('bcryptjs')
module.exports = {
  async up (queryInterface, Sequelize) {

    return await queryInterface.bulkInsert('Users' , [
      {
        userName:'Tom',
        email:'tom@user.io',
        hashedPassword: bcrypt.hashSync('password1')
      },
      {
        userName: 'Ryan',
        email: 'ryan@user.io',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        userName: 'Varsha',
        email: 'varsha@user.io',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        userName: 'Javier',
        email: 'javier@user.io',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        userName: 'Rakesh',
        email: 'rakesh@user.io',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        userName: 'Bill',
        email: 'bill@user.io',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        userName: 'Katy',
        email: 'katy@user.io',
        hashedPassword: bcrypt.hashSync('password7')
      },
      {
        userName: 'Jensen',
        email: 'jensen@user.io',
        hashedPassword: bcrypt.hashSync('password8')
      },
    ],{})

  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op
    return await queryInterface.bulkDelete('Users', {
      userName:{[Op.in]:['Demo-lition','FakeUser1','FakeUser2']}
    },{})
  }
};
