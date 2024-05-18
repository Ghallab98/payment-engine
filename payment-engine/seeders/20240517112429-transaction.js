"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "transactions",
      [
        {
          id: 1,
          amount: 1000,
          status: "successful",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          amount: 500,
          status: "declined",
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
          status: "declined",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("transactions", null, {});
  },
};
