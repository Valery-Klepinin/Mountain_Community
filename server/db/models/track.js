'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Track extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Comment, Rating, User, Image, Favorite }) {
      this.hasMany(Comment, { foreignKey: 'trackId' });
      this.hasMany(Image, { foreignKey: 'trackId' });
      this.hasMany(Rating, { foreignKey: 'trackId' });
      this.belongsToMany(User, {
        through: Favorite,
        foreignKey: 'trackId',
        otherKey: 'userId',
      });
    }
  }
  Track.init(
    {
      title: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      rating: {
        allowNull: false,
        defaultValue: 0,
        type: DataTypes.FLOAT,
      },
    },
    {
      sequelize,
      modelName: 'Track',
    }
  );
  return Track;
};
