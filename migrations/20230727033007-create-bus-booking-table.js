'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bus-bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      busScheduleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'bus-schedules',
          key: 'id',
        },
      },
      totalSeatsBooked: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      status: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: 'pending',
      },
      paymentId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'payments',
          key: 'id',
        },
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
    await queryInterface.dropTable('bus-bookings');
  },
};
