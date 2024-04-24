'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
    */
    await queryInterface.addColumn('products', 'billId', {
      type: Sequelize.STRING,
      allowNull: false,
      after: 'categoryId'
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
    */
    await queryInterface.removeColumn('products', 'billId');
  }
};
