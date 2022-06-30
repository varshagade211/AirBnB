'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userName: {
        type: Sequelize.STRING(30),
        allowNull:false
      },
      email: {
        type: Sequelize.STRING(256),
         allowNull:false
      },
      hashedPassword: {
        type: Sequelize.STRING.BINARY,
         allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
         allowNull:false,
         defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
         allowNull:false,
         defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
