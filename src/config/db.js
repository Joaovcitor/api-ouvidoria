import dotenv from "dotenv";

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env'
});

export default {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "database_development",
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "mariadb",
    migrationStorageTableName: "SequelizeMeta", // Tabela de controle de migrações
    migrations: {
      path: "src/db/migrations", // Caminho para as migrações
      pattern: /\.cjs$/ // Adicione um padrão para capturar arquivos .cjs
    }
  },
  test: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || null,
    database: "database_test",
    host: process.env.DB_HOST || "localhost",
    dialect: "sqlite",
    storage: ":memory"
  },
  production: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || null,
    database: "database_production",
    host: process.env.DB_HOST || "localhost",
    dialect: "mariadb",
  },
};
