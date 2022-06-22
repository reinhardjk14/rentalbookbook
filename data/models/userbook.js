'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserBook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserBook.belongsTo(models.User, {
        foreignKey: 'UserId',
        targetKey: 'id'
      })
      UserBook.belongsTo(models.Book, {
        foreignKey: 'BookId',
        targetKey: 'id'
      })
    }
  }
  UserBook.init({
    UserId: DataTypes.INTEGER,
    BookId: DataTypes.INTEGER,
    borrow_date: DataTypes.DATE,
    return_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UserBook',
  });
  return UserBook;
};