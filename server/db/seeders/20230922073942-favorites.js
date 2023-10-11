'use strict';

const { Favorite, User, Track } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const user1 = await User.findOne({ where: { name: 'Валерия Максимова' } });
    const user2 = await User.findByPk(3);
    const track1 = await Track.findOne({ where: { title: 'Track1' } });
    const track2 = await Track.findByPk(3);
    const track3 = await Track.findByPk(4);
    const track4 = await Track.findByPk(5);
    const track5 = await Track.findByPk(6);
    const track6 = await Track.findByPk(7);

    await user1.addTrack(track1);
    await user1.addTrack(track2);
    await user1.addTrack(track3);
    await user1.addTrack(track4);
    await user1.addTrack(track5);
    await user1.addTrack(track6);

    await user2.addTrack(track1);
    await user2.addTrack(track3);
    await user2.addTrack(track5);
    await user2.addTrack(track6);
  },

  async down(queryInterface, Sequelize) {
    await Favorite.destroy({ truncate: { cascade: true } });
  },
};
