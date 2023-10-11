'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Track, User }) {
      this.belongsTo(Track, { foreignKey: 'trackId' });
      this.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  Comment.init(
    {
      trackId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Tracks',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      text: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Comment',
    }
  );
  return Comment;
};
