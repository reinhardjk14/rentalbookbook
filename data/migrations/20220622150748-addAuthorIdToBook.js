'use strict';


module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Books', 'AuthorId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Authors'
      }
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Books', 'AuthorId')
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
