'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable('Alunos',{
      id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome:{
        type:Sequelize.STRING,
        allowNull: false,
      },
      email:{
        type:Sequelize.STRING,
        allowNull:false,
      },
      ra:{
        type:Sequelize.STRING,
        allowNull:false,
        unique: true
      },
      cpf:{
        type:Sequelize.STRING,
        allowNull:false
      },
      created_at:{
        type:Sequelize.DATE,
        allowNull: false
      },
      updated_at:{
        type:Sequelize.DATE,
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.dropTable('Alunos');
  }
};
