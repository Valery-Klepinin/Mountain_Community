'use strict';

const { Rating } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Rating.create({
      trackId: 1,
      userId: 2,
      rating: 3,
    });
    await Rating.create({
      trackId: 2,
      userId: 2,
      rating: 4,
    });
    await Rating.create({
      trackId: 3,
      userId: 2,
      rating: 2,
    });
    await Rating.create({
      trackId: 4,
      userId: 2,
      rating: 5,
    });
    await Rating.create({
      trackId: 2,
      userId: 2,
      rating: 4,
    });
    await Rating.create({
      trackId: 3,
      userId: 2,
      rating: 4,
    });
    await Rating.create({
      trackId: 6,
      userId: 2,
      rating: 4,
    });
    await Rating.create({
      trackId: 9,
      userId: 2,
      rating: 2,
    });
    await Rating.create({
      trackId: 8,
      userId: 3,
      rating: 4,
    });
    await Rating.create({
      trackId: 1,
      userId: 3,
      rating: 4,
    });
    await Rating.create({
      trackId: 5,
      userId: 3,
      rating: 1,
    });
    await Rating.create({
      trackId: 7,
      userId: 3,
      rating: 3,
    });
    await Rating.create({
      trackId: 2,
      userId: 3,
      rating: 5,
    });
    await Rating.create({
      trackId: 2,
      userId: 3,
      rating: 2,
    });
    await Rating.create({
      trackId: 6,
      userId: 3,
      rating: 3,
    });
  },

  async down(queryInterface, Sequelize) {
    await Rating.destroy({ truncate: { cascade: true } });
  },
};
