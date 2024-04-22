'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(15)
      },
      firstName: Sequelize.STRING(15),
      lastName: Sequelize.STRING(15),
      password: Sequelize.STRING(255),
      email: Sequelize.STRING(255),
      contactNumber: Sequelize.STRING(10),
      status: Sequelize.STRING(15),
      role: Sequelize.STRING(15),      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};