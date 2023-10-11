'use strict';

const { Comment } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Comment.create({
      trackId: 1,
      userId: 2,
      text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur ratione quam tenetur. Itaque facilis eos sed tempore, totam blanditiis quis provident quas, ipsam rerum aliquam fugiat vel nihil enim minus.',
    });
    await Comment.create({
      trackId: 2,
      userId: 2,
      text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur ratione quam tenetur. Itaque facilis eos sed tempore, totam blanditiis quis provident quas, ipsam rerum aliquam fugiat vel nihil enim minus.',
    });
    await Comment.create({
      trackId: 3,
      userId: 2,
      text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur ratione quam tenetur. Itaque facilis eos sed tempore, totam blanditiis quis provident quas, ipsam rerum aliquam fugiat vel nihil enim minus.',
    });
    await Comment.create({
      trackId: 4,
      userId: 2,
      text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur ratione quam tenetur. Itaque facilis eos sed tempore, totam blanditiis quis provident quas, ipsam rerum aliquam fugiat vel nihil enim minus.',
    });
    await Comment.create({
      trackId: 2,
      userId: 2,
      text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur ratione quam tenetur. Itaque facilis eos sed tempore, totam blanditiis quis provident quas, ipsam rerum aliquam fugiat vel nihil enim minus.',
    });
    await Comment.create({
      trackId: 3,
      userId: 2,
      text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur ratione quam tenetur. Itaque facilis eos sed tempore, totam blanditiis quis provident quas, ipsam rerum aliquam fugiat vel nihil enim minus.',
    });
    await Comment.create({
      trackId: 6,
      userId: 2,
      text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur ratione quam tenetur. Itaque facilis eos sed tempore, totam blanditiis quis provident quas, ipsam rerum aliquam fugiat vel nihil enim minus.',
    });
    await Comment.create({
      trackId: 9,
      userId: 2,
      text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur ratione quam tenetur. Itaque facilis eos sed tempore, totam blanditiis quis provident quas, ipsam rerum aliquam fugiat vel nihil enim minus.',
    });
    await Comment.create({
      trackId: 8,
      userId: 3,
      text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur ratione quam tenetur. Itaque facilis eos sed tempore, totam blanditiis quis provident quas, ipsam rerum aliquam fugiat vel nihil enim minus.',
    });
    await Comment.create({
      trackId: 1,
      userId: 3,
      text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur ratione quam tenetur. Itaque facilis eos sed tempore, totam blanditiis quis provident quas, ipsam rerum aliquam fugiat vel nihil enim minus.',
    });
    await Comment.create({
      trackId: 5,
      userId: 3,
      text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur ratione quam tenetur. Itaque facilis eos sed tempore, totam blanditiis quis provident quas, ipsam rerum aliquam fugiat vel nihil enim minus.',
    });
    await Comment.create({
      trackId: 7,
      userId: 3,
      text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur ratione quam tenetur. Itaque facilis eos sed tempore, totam blanditiis quis provident quas, ipsam rerum aliquam fugiat vel nihil enim minus.',
    });
    await Comment.create({
      trackId: 2,
      userId: 3,
      text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur ratione quam tenetur. Itaque facilis eos sed tempore, totam blanditiis quis provident quas, ipsam rerum aliquam fugiat vel nihil enim minus.',
    });
    await Comment.create({
      trackId: 2,
      userId: 3,
      text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur ratione quam tenetur. Itaque facilis eos sed tempore, totam blanditiis quis provident quas, ipsam rerum aliquam fugiat vel nihil enim minus.',
    });
    await Comment.create({
      trackId: 6,
      userId: 3,
      text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur ratione quam tenetur. Itaque facilis eos sed tempore, totam blanditiis quis provident quas, ipsam rerum aliquam fugiat vel nihil enim minus.',
    });
  },

  async down(queryInterface, Sequelize) {
    await Comment.destroy({ truncate: { cascade: true } });
  },
};
