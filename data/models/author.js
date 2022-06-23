'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Author.hasMany(models.Book)
    }

    get fullName() {
      return `${this.first_name} ${this.last_name}`
    }
  }
  Author.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Nama depan tidak boleh kosong!'
        },
        notEmpty: {
          msg: 'Silahkan masukkan nama depan pengarang!'
        }
      }
    }, 
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Nama belakang tidak boleh kosong! Jika tidak ada, silahkan masukkan nama depan lagi.'
        },
        notEmpty: {
          msg: 'Silahkan masukkan nama belakang pengarang! Jika tidak ada, silahkan masukkan nama depan lagi.'
        }
      }
    }, 
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Umur tidak boleh kosong!'
        },
        notEmpty: {
          msg: 'Silahkan masukkan umur pengarang!'
        }
      }
    } 
  }, {
    sequelize,
    modelName: 'Author',
  });
  return Author;
};