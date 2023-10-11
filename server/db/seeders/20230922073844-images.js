'use strict';

const { Image } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Image.create({
      trackId: 1,
      img: 'https://fastly.4sqi.net/img/general/width960/62158332_JV9Oi3YQKqmv_uuQEwEaNCsT8k570HATUCbjA3OPQQw.jpg',
    });
    await Image.create({
      trackId: 1,
      img: 'https://club-voshod.com/files/materials/159/group_cf/vodopad_azau_ekotropa_elbrus_cheget_1_3.webp',
    });
    await Image.create({
      trackId: 1,
      img: 'https://core-pht-proxy.maps.yandex.ru/v1/photos/download?photo_id=P3uxYM3mktNOdmql27e&image_size=X5L',
    });
    await Image.create({
      trackId: 2,
      img: 'https://s15.stc.all.kpcdn.net/russia/wp-content/uploads/2021/08/Waterfall_Terskol_Viki-2048.jpg',
    });
    await Image.create({
      trackId: 2,
      img: 'https://s15.stc.all.kpcdn.net/russia/wp-content/uploads/2021/08/gory-tsvety_piskabej-2048.jpg',
    });
    await Image.create({
      trackId: 2,
      img: 'https://35photo.pro/photos_main/243/1219658.jpg',
    });
    await Image.create({
      trackId: 3,
      img: 'https://celes.club/uploads/posts/2022-04/thumbs/1651096459_1-celes-club-p-vodopad-devichi-kosi-priroda-krasivo-foto-1.jpg',
    });
    await Image.create({
      trackId: 3,
      img: 'https://celes.club/uploads/posts/2022-04/thumbs/1651096497_2-celes-club-p-vodopad-devichi-kosi-priroda-krasivo-foto-2.jpg',
    });
    await Image.create({
      trackId: 3,
      img: 'https://www.euromag.ru/storage/c/2021/07/16/1626422073_210230_05.jpg',
    });
    await Image.create({
      trackId: 4,
      img: 'https://avatars.dzeninfra.ru/get-zen_doc/9352495/pub_641ad1c32ca0251d1fff39a6_641ad2294680f207d829aa46/scale_1200',
    });
    await Image.create({
      trackId: 4,
      img: 'https://cs12.pikabu.ru/post_img/big/2022/06/27/4/1656305001183944525.jpg',
    });
    await Image.create({
      trackId: 4,
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/%D0%9E%D0%B1%D1%81%D0%B5%D1%80%D0%B2%D0%B0%D1%82%D0%BE%D1%80%D0%B8%D1%8F_%D0%9F%D0%B8%D0%BA_%D0%A2%D0%B5%D1%80%D1%81%D0%BA%D0%BE%D0%BB.tif/lossy-page1-450px-%D0%9E%D0%B1%D1%81%D0%B5%D1%80%D0%B2%D0%B0%D1%82%D0%BE%D1%80%D0%B8%D1%8F_%D0%9F%D0%B8%D0%BA_%D0%A2%D0%B5%D1%80%D1%81%D0%BA%D0%BE%D0%BB.tif.jpg',
    });
    await Image.create({
      trackId: 5,
      img: 'http://kavtrans.ru/timthumb.php?src=gallery/2005-1_Elbrus/P8070049.JPG&w=880&zc=1&q=75',
    });
    await Image.create({
      trackId: 5,
      img: 'https://avatars.mds.yandex.net/get-altay/4280929/2a0000017aa43b22c1d193a6526e2e49b2d2/L_height',
    });
    await Image.create({
      trackId: 5,
      img: 'https://risk.ru/u/img/14/13441-670.jpg',
    });
    await Image.create({
      trackId: 6,
      img: 'https://www.southural.ru/sites/default/files/su_photos/5497.jpg',
    });
    await Image.create({
      trackId: 6,
      img: 'https://avatars.mds.yandex.net/get-altay/4439632/2a00000178ab940f63e9e179367616107466/L_height',
    });
    await Image.create({
      trackId: 6,
      img: 'https://pereval.online/imagecache/original/object/images/2020/01/31/430ff5-835456-original.jpg',
    });
    await Image.create({
      trackId: 7,
      img: 'https://static.tildacdn.com/tild3033-6132-4731-b634-386361343364/51e70127b0f247feaad1.jpg',
    });
    await Image.create({
      trackId: 7,
      img: 'https://thumb.tildacdn.com/tild6263-3562-4861-b439-363834386437/-/format/webp/4343179.jpg',
    });
    await Image.create({
      trackId: 7,
      img: 'https://thumb.tildacdn.com/tild6338-3233-4761-b465-626336313161/-/format/webp/SS-Elbrus_098.jpg',
    });
    await Image.create({
      trackId: 8,
      img: 'https://thumb.tildacdn.com/tild3730-6364-4337-b366-653535356164/-/format/webp/objective-su-ozero3.jpg',
    });
    await Image.create({
      trackId: 8,
      img: 'https://thumb.tildacdn.com/tild3731-3731-4061-a534-363838333062/-/format/webp/5879059.jpg',
    });
    await Image.create({
      trackId: 8,
      img: 'https://thumb.tildacdn.com/tild3732-3266-4964-b337-656663376437/-/format/webp/c4a9296b214103bc5035.jpg',
    });
    await Image.create({
      trackId: 9,
      img: 'https://s3.trevio.ru/f6/c9/2918/2018/08/01/5c3fdb1a-7b3e-4f09-ada0-ad30a4ea7ca0.jpg',
    });
    await Image.create({
      trackId: 9,
      img: 'https://club-voshod.com/files/materials/373/group_cf/ushchele_adyl_su_udivitelnoe_i_volshebnoe_3_1.jpg',
    });
    await Image.create({
      trackId: 9,
      img: 'https://risk.ru/u/img/319/318712.jpeg',
    });
  },

  async down(queryInterface, Sequelize) {
    await Image.destroy({ truncate: { cascade: true } });
  },
};
