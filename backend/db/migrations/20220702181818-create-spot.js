'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      address: {
        type: Sequelize.STRING,
        allowNull:false
      },
      city: {
        type: Sequelize.STRING,
        allowNull:false
      },
      state: {
        type: Sequelize.STRING,
        allowNull:false
      },
      country: {
        type: Sequelize.STRING,
        allowNull:false
      },
      lat: {
        type: Sequelize.DECIMAL,
        allowNull:false
      },
      lng: {
        type: Sequelize.DECIMAL,
        allowNull:false
      },
      description: {
        type: Sequelize.STRING,
        allowNull:false
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Users'
        },
        onDelete:'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Spots');
  }
};
