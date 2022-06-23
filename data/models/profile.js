'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
    }
  }
  Profile.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Nama tidak boleh kosong!'
        },
        notEmpty: {
          msg: 'Silahkan masukkan nama!'
        }
      }
    }, 
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
    } 
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};