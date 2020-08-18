'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Products", [{
      name: "Rinso Coklat",
      stock: 10,
      price: 15000,
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "Rinso Putih",
      stock: 10,
      price: 15000,
      user_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "Susu Putih",
      stock: 10,
      price: 15000,
      user_id: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Products", null, {})
  }
};
