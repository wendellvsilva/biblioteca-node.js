import { Sequelize } from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("Conexão com o MySQL deu certo!");

    
        await sequelize.sync(); 
        console.log("Modelos sincronizados com o banco de dados!");
    } catch (error) {
        console.error("Erro na conexão com o MySQL:", error);
    }
}

export { sequelize, connectDB };
