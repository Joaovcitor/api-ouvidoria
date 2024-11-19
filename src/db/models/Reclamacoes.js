import { sequelize } from "../../config/conn.js"
import { DataTypes, Model } from "sequelize";
class Reclamacoes extends Model { }
Reclamacoes.init({
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: {
        args: [4, 450],
        msg: "Descrição tem que ter entre 4 a 450 caracteres!"
      },
    }
  },
  status: {
    type: DataTypes.ENUM("pendente", "em analise", "resolvida"),
    allowNull: false,
    defaultValue: "pendente"
  },
  resposta: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  secretariaResponsavel: {
    type: DataTypes.ENUM("nao sei", "secretaria A", "secretaria B"),
    defaultValue: "nao sei",
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,

    references: {
      model: "Users",
      key: "id"
    }
  },
}, {
  sequelize,
  modelName: "Reclamacoes"
})

export default Reclamacoes;
