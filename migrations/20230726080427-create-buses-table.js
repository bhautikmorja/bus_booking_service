'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('buses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      busNumber: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },  
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('buses');
  },
};
