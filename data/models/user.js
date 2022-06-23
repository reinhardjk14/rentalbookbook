'use strict';

const bcrypt = require('bcryptjs');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile)
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
         notNull: {
          msg: 'Email tidak boleh kosong!'
         },
         notEmpty: {
          msg: 'Silahkan masukkan email!'
         }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password tidak boleh kosong'
        },
        notEmpty: {
          msg: 'Silahkan masukkan password'
        }
      }
    }, 
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user',
      validate: {
        notNull: 'Role tidak boleh kosong!'
      },
      notEmpty: {
        msg: 'Silahkan masukkan role!'
      }
    } 
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((instance, options) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(instance.password, salt)
    instance.password = hash 
  })
  return User;
};