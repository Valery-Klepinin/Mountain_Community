'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Track }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsTo(Track, { foreignKey: 'trackId' });
    }
  }
  Favorite.init(
    {
      trackId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        // primaryKey: true,
        references: {
          model: 'Tracks',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        // primaryKey: true,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'cascade',
      },
    },
    {
      sequelize,
      modelName: 'Favorite',
    }
  );
  return Favorite;
};
