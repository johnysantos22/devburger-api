'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.removeColumn('products', 'category_id');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'category_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  }
};
