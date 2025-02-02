"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Reclamacoes", "endereco", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "Não informado"
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Reclamacoes");
  }
};
