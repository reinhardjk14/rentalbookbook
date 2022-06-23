'use strict';


module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Books', 'isBorrowed', Sequelize.BOOLEAN)
  },

  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Books', 'isBorrowed')
  }
};
