'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      { tableName: 'Categories', schema: 'public' }, // 👈 Respetar la C mayúscula
      'color',
      {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '#888888',
      }
    );
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(
      { tableName: 'Categories', schema: 'public' }, // 👈 Igual que arriba
      'color'
    );
  }
};
