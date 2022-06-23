'use strict';

const { Op } = require('sequelize');

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
    }

    static showAllBooks(Author, search) {
      let options = {
        include: Author,
        order: [['released_year', 'DESC']]
      }
      if (search) {
        options.where = {
          ...options.where,
          title: {
            [Op.iLike]: `%${search}%`
          }
        }
      }
      return this.findAll(options)
    }
  }
  Book.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Judul tidak boleh kosong!'
        },
        notEmpty: {
          msg: 'Silahkan masukkan judul buku!'
        }
      }
    }, 
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Genre tidak boleh kosong!'
        },
        notEmpty: {
          msg: 'Silahkan masukkan genre buku!'
        }
      }
    },
    released_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Tahun rilis tidak boleh kosong!'
        },
        notEmpty: {
          msg: 'Silahkan masukkan tahun rilis buku!'
        }
      }
    }, 
    status: {
      type: DataTypes.STRING
    },
    AuthorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Pengarang tidak boleh kosong! Jika nama pengarang tidak ada, silahkan tambahkan pengarang terlebih dahulu'
        },
        notEmpty: {
          msg: 'Silahkan masukkan nama pengarang. Jika nama pengarang tidak ada, silahkan tambahkan pengarang terlebih dahulu'
        }
      }
    } 
  }, {
    sequelize,
    modelName: 'Book',
  });

  Book.beforeCreate((instance, options) => {
    instance.status = 'available'
  })
  return Book;
};