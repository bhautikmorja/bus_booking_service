'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('payments', 'orderId', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('payments', 'signature', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('payments', 'orderId');
    await queryInterface.removeColumn('payments', 'signature');
  },
};
