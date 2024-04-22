'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
    */
    await queryInterface.addIndex('users', ['email'], {
      type: "unique",
      name: "users_u1",
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
    */
    await queryInterface.removeIndex('users_u1');
  }
};
