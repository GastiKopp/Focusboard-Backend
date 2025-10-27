// migrations/XXXXXX-add-category-to-task.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('tasks', 'categoryId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Categories',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('tasks', 'categoryId');
  }
};
