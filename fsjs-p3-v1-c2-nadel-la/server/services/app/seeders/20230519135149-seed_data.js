"use strict";
const fs = require("fs");
const { hashPassword } = require("../helpers/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8")).map(
      (u) => {
        u.createdAt = new Date();
        u.updatedAt = new Date();
        u.role = "Admin";
        u.password = hashPassword(u.password);
        return u;
      }
    );

    const categories = JSON.parse(
      fs.readFileSync("./data/categories.json", "utf-8")
    ).map((c) => {
      c.createdAt = new Date();
      c.updatedAt = new Date();
      return c;
    });

    const items = JSON.parse(fs.readFileSync("./data/items.json", "utf-8")).map(
      (i) => {
        i.updatedAt = new Date();
        i.createdAt = new Date();

        return i;
      }
    );

    const ingredients = JSON.parse(
      fs.readFileSync("./data/ingredients.json", "utf-8")
    ).map((el) => {
      el.updatedAt = new Date();
      el.createdAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("Users", users, {});
    await queryInterface.bulkInsert("Categories", categories, {});
    await queryInterface.bulkInsert("Items", items, {});
    await queryInterface.bulkInsert("Ingredients", ingredients, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Categories", null, {});
    await queryInterface.bulkDelete("Items", null, {});
    await queryInterface.bulkInsert("Ingredients", null, {});
  },
};
