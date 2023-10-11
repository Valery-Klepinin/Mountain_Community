'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coordinate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Track }) {
      this.belongsTo(Track, { foreignKey: 'trackId' });
    }
  }
  Coordinate.init(
    {
      trackId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Tracks',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      coordinateLatitude: DataTypes.FLOAT,
      coordinateLongitude: DataTypes.FLOAT,
      index: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Coordinate',
    }
  );
  return Coordinate;
};
