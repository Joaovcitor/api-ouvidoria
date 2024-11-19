import { sequelize } from "../../config/conn.js"
import { DataTypes, Model } from "sequelize";
class Users extends Model { }
Users.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      name: 'unique_email_constraint',
      msg: "Este email já está sendo usado. Use outro!"
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("adm", "comum", "secretario"),
    allowNull: false,
    defaultValue: "comum"
  },
  isAdmAndComum: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  earlyAccess: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isMemberOfSecretario: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  belongingSecretariat: {
    type: DataTypes.ENUM("nao pertence", "secretaria A", "secretaria B"),
    allowNull: false,
    defaultValue: "nao pertence"
  },

}, {
  sequelize,
  modelName: "Users"
})

export default Users;
