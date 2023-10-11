'use strict';

const { Coordinate } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Coordinate.create({
      trackId: 1,
      coordinateLatitude: 43.266021,
      coordinateLongitude: 42.472614,
      index: 1,
    });
    await Coordinate.create({
      trackId: 1,
      coordinateLatitude: 43.264303,
      coordinateLongitude: 42.478543,
      index: 2,
    });
    await Coordinate.create({
      trackId: 2,
      coordinateLatitude: 43.288669,
      coordinateLongitude: 42.500174,
      index: 1,
    });
    await Coordinate.create({
      trackId: 2,
      coordinateLatitude: 43.256329,
      coordinateLongitude: 42.513047,
      index: 2,
    });
    await Coordinate.create({
      trackId: 3,
      coordinateLatitude: 43.25747102659855,
      coordinateLongitude: 42.51212452512068,
      index: 1,
    });
    await Coordinate.create({
      trackId: 3,
      coordinateLatitude: 43.274492775977414,
      coordinateLongitude: 42.49333576646462,
      index: 2,
    });
    await Coordinate.create({
      trackId: 4,
      coordinateLatitude: 43.25747102659855,
      coordinateLongitude: 42.51212452512068,
      index: 1,
    });
    await Coordinate.create({
      trackId: 4,
      coordinateLatitude: 43.290789458288614,
      coordinateLongitude: 42.47841154656868,
      index: 2,
    });
    await Coordinate.create({
      trackId: 5,
      coordinateLatitude: 43.274162793156194,
      coordinateLongitude: 42.4606068447137,
      index: 1,
    });
    await Coordinate.create({
      trackId: 5,
      coordinateLatitude: 43.28375565668895,
      coordinateLongitude: 42.44704025100652,
      index: 2,
    });
    await Coordinate.create({
      trackId: 6,
      coordinateLatitude: 43.25747102659855,
      coordinateLongitude: 42.51212452512068,
      index: 1,
    });
    await Coordinate.create({
      trackId: 6,
      coordinateLatitude: 43.30225944640536,
      coordinateLongitude: 42.48279229487456,
      index: 2,
    });
    await Coordinate.create({
      trackId: 7,
      coordinateLatitude: 43.25454060544905,
      coordinateLongitude: 42.64350707034773,
      index: 1,
    });
    await Coordinate.create({
      trackId: 7,
      coordinateLatitude: 43.29325682109011,
      coordinateLongitude: 42.599314745338845,
      index: 2,
    });
    await Coordinate.create({
      trackId: 8,
      coordinateLatitude: 43.31023847403753,
      coordinateLongitude: 42.75396592198936,
      index: 1,
    });
    await Coordinate.create({
      trackId: 8,
      coordinateLatitude: 43.326122446655646,
      coordinateLongitude: 42.67359395171615,
      index: 2,
    });
    await Coordinate.create({
      trackId: 9,
      coordinateLatitude: 43.254591,
      coordinateLongitude: 42.64401,
      index: 1,
    });
    await Coordinate.create({
      trackId: 9,
      coordinateLatitude: 43.244676,
      coordinateLongitude: 42.636115,
      index: 2,
    });
  },

  async down(queryInterface, Sequelize) {
    await Coordinate.destroy({ truncate: { cascade: true } });
  },
};
