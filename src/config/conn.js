import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Carregar as variáveis de ambiente
if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" }); // Carrega o arquivo .env.production
} else if (process.env.NODE_ENV === "test") {
  dotenv.config({ path: ".env.test" }); // Carrega o arquivo .env.test para testes
} else {
  dotenv.config(); // Carrega o arquivo .env padrão (para desenvolvimento)
}

let sequelize;

// Configuração do Sequelize para testes e ambientes de produção/desenvolvimento
if (process.env.NODE_ENV === "production") {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: process.env.DB_DIALECT,
      timezone: "-03:00",
      dialectOptions: {
        connectTimeout: 60000 // 60 segundos
      },
      logging: false // Desativa logs de SQL para produção
    }
  );
} else {
  // Configuração para ambientes de produção e desenvolvimento (com pooling de conexões)
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306, // Porta do banco de dados
      dialect: process.env.DB_DIALECT, // Tipo do banco (mysql, mariadb, etc)
      dialectOptions: {
        connectTimeout: 60000 // Tempo de espera para conexão (60 segundos)
      },
      // Pooling de conexões para ambientes de produção
      pool: {
        max: 5, // Máximo de conexões no pool
        min: 0, // Mínimo de conexões no pool
        acquire: 30000, // Tempo máximo de espera por uma conexão do pool (30 segundos)
        idle: 10000 // Tempo de inatividade antes de liberar a conexão (10 segundos)
      },
      logging: process.env.NODE_ENV === "production" ? false : console.log // Desativa log de queries em produção
    }
  );
}

export { sequelize };
