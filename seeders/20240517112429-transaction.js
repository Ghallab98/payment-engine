"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "transactions",
      [
        {
          id: 1,
          amount: 1000,
          status: "initiated",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          amount: 500,
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          amount: 1200,
          status: "successful",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          amount: 1500,
          status: "denied",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          amount: 2000,
          status: "initiated",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("transactions", null, {});
  },
};
