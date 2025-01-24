"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Duvidas", {
      id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      descricao: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          len: {
            args: [4, 450],
            msg: "Descrição tem que ter entre 4 a 450 caracteres!"
          }
        }
      },
      status: {
        type: Sequelize.ENUM("pendente", "em analise", "resolvida"),
        allowNull: false,
        defaultValue: "pendente"
      },
      resposta: {
        type: Sequelize.TEXT,
        allowNull: true,
        validate: {
          len: {
            args: [4, 450],
            msg: "Resposta tem que ter entre 4 a 450 caracteres!"
          }
        },
        defaultValue: "Sem resposta até o momento"
      },
      secretariaResponsavel: {
        type: Sequelize.ENUM("nao sei", "secretaria A", "secretaria B"),
        defaultValue: "nao sei",
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id"
        }
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
    await queryInterface.dropTable("Duvidas");
  }
};
