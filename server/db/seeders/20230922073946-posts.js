'use strict';

const { Post } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Post.create({
      title: 'Интересные факты о рыси',
      description: 'рыси классные',
      img: 'https://avo-cado.ru/assets/components/phpthumbof/cache/1.68be930951ee3159a7acd3c09e832cff.jpg',
    });
    await Post.create({
      title: 'Интересные факты о енотах',
      description: 'еноты душные',
      img: 'https://avatars.dzeninfra.ru/get-zen_doc/4366388/pub_641c520b5f97013c12d5a3df_641c5512f59c065bae7f4b79/scale_1200',
    });
    await Post.create({
      title: 'Интересные факты о волках',
      description: 'волки ауф выкатываем со дворов',
      img: 'https://avatars.mds.yandex.net/get-mpic/5290046/img_id3781808827783597049.jpeg/orig',
    });
    await Post.create({
      title: 'Интересные факты о лисах',
      description: 'лисы лисички',
      img: 'https://www.purmuseum.ru/uploads/images/2021/Publikacii2021/LisaKrasnay/Big/%D0%BA%D1%80%D0%B0%D1%81%D0%BD%D0%B0%D1%8F%20%D0%BB%D0%B8%D1%81%D0%B0%20(1).jpg',
    });
  },

  async down(queryInterface, Sequelize) {
    await Post.destroy({ truncate: { cascade: true } });
  },
};
