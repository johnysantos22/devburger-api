'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface) => {
    return queryInterface.removeColumn('products', 'category');
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('products', 'category', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
