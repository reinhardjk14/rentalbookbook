'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.belongsTo(models.Author)
      Book.belongsToMany(models.User, {
        through: models.UserBook
      })
    }
  }
  Book.init({
    title: DataTypes.STRING,
    genre: DataTypes.STRING,
    released_year: DataTypes.INTEGER,
    status: DataTypes.STRING,
    isBorrowed: DataTypes.BOOLEAN,
    AuthorId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate(book, option) {
        book.status = `Availble`
      }
    },
    sequelize,
    modelName: 'Book',
  });
  return Book;
};