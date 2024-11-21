'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('categories', 'path', {
      type: Sequelize.STRING,
      allowNull: true, // ou false, dependendo da sua necessidade
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('categories', 'path'); // Corrigido para remover a coluna
  }
};