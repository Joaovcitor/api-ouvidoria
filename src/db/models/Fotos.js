import Sequelize, { Model } from "sequelize";
import { sequelize } from "../../config/conn.js";
import Reclamacoes from "./Reclamacoes.js";

class Fotos extends Model {}

Fotos.init(
  {
    originalname: {
      type: Sequelize.STRING,
      defaultValue: "",
      validate: {
        notEmpty: {
          msg: "Campo não pode ficar vazio"
        }
      }
    },
    filename: {
      type: Sequelize.STRING,
      defaultValue: "",
      validate: {
        notEmpty: {
          msg: "Campo não pode ficar vazio"
        }
      }
    },
    reclamacao_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Reclamacoes",
        key: "id"
      }
    },
    url: {
      type: Sequelize.VIRTUAL,
      get() {
        return `https://apiouvidoria.logicmasters.com.br/uploads/${this.getDataValue("filename")}`;
      }
    }
  },
  {
    sequelize,
    tableName: "Fotos"
  }
);

// Agora importamos Reclamacoes de forma dinâmica

// A associação pode ser feita após os modelos estarem carregados
Fotos.belongsTo(Reclamacoes, { foreignKey: "reclamacao_id", as: "Reclamacao" });
Reclamacoes.hasMany(Fotos, { foreignKey: "reclamacao_id", as: "Fotos" });

export default Fotos;
