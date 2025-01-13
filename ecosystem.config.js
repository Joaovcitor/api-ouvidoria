module.exports = {
  apps: [
    {
      name: "ouvidoria-api", // Nome do processo
      script: "./server.js", // Caminho para o arquivo principal da API (substitua por seu arquivo de entrada)
      instances: "max", // O número de instâncias que o PM2 deve rodar
      exec_mode: "cluster", // Usa o modo de cluster para balanceamento de carga
      watch: true, // Ativa a observação de arquivos para reiniciar automaticamente
      env: {
        NODE_ENV: "production", // Variáveis de ambiente para desenvolvimento
        PORT: 3004 // Porta onde a API estará rodando
      },
      env_production: {
        NODE_ENV: "production", // Variáveis de ambiente para produção
        PORT: 8080
      }
    }
  ]
};
