'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
          name: 'unique_email_constraint',
          msg: "Este email já está sendo usado. Use outro!"
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM("adm", "comum", "secretario"),
        allowNull: false,
        defaultValue: "comum"
      },
      isAdmAndComum: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      earlyAccess: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isMemberOfSecretario: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      belongingSecretariat: {
        type: Sequelize.ENUM("nao pertence", "secretaria A", "secretaria B"),
        allowNull: false,
        defaultValue: "nao pertence"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users")
  }
};
