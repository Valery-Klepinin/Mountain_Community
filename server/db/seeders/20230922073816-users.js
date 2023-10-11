'use strict';

const { User } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await User.create({
      name: 'Stepa',
      isAdmin: true,
      email: 'stepa@yandex.ru',
      password: '123',
    });

    await User.create({
      name: 'Валерия Максимова',
      email: 'valeria@example.com',
      password: '123',
    });

    await User.create({
      name: 'Анна Николаева',
      email: 'anna@example.com',
      password: '123',
    });
  },

  async down(queryInterface, Sequelize) {
    await User.destroy({ truncate: { cascade: true } });
  },
};
