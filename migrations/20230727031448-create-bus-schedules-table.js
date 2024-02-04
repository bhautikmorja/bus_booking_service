'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bus-schedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      busId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'buses',
          key: 'id',
        },
      },
      totalSeats: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ticketPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      startDestination: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      endDestination: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      startTime: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      endTime: {
        type: Sequelize.STRING(50),
        allowNull: true,
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
    await queryInterface.dropTable('bus-schedules');
  },
};
