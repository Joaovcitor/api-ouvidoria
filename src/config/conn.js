import { Sequelize } from "sequelize";
import dotenv from "dotenv";

let sequelize;

if (process.env.NODE_ENV === "test") {
  dotenv.config({ path: ".env.test" }); // Carrega .env.test para testes
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: process.env.DB_STORAGE,
    logging: false // Desativa logs de SQL para testes
  });
} else {
  dotenv.config(); // Carrega o .env padrão
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: 3306,
      dialect: process.env.DB_DIALECT,
      timezone: "-03:00",
      dialectOptions: {
        connectTimeout: 60000 // 60 segundos
      }
    }
  );
}

export { sequelize };
