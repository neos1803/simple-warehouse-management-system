'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [{
      full_name: "John Doe",
      username: "johndoe",
      email: "johndoe@gmail.com",
      phone_number: "087879431",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      full_name: "Sam Doe",
      username: "samdoe",
      email: "samdoe@gmail.com",
      phone_number: "087879489",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      full_name: "Jhonny Doe",
      username: "jhonnydoe",
      email: "jhonnydoe@gmail.com",
      phone_number: "087879441",
      role: "admin",
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
    return queryInterface.bulkDelete("Users", null, {})
  }
};
