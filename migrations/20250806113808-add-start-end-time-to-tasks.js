'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('tasks', 'start_time', {
      type: Sequelize.TIME,
      allowNull: true,
    });
    await queryInterface.addColumn('tasks', 'end_time', {
      type: Sequelize.TIME,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('tasks', 'start_time');
    await queryInterface.removeColumn('tasks', 'end_time');
  }
};
