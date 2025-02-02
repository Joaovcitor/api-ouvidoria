"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Fotos", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      originalName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      filename: {
        type: Sequelize.STRING,
        allowNull: false
      },
      reclamacao_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Reclamacoes",
          key: "id"
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Fotos");
  }
};
