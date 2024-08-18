// src/dbconfig/dbConnect.js
import testConfig from '../../tests/controllers/testConfig.js';
import { Sequelize } from 'sequelize';
import 'dotenv/config'


const isTestEnv = process.env.NODE_ENV === 'test';


const sequelize = new Sequelize(
    isTestEnv ? testConfig : process.env.DB_NAME,
    isTestEnv ? undefined : process.env.DB_USER,
    isTestEnv ? undefined : process.env.DB_PASSWORD,
    {
        host: isTestEnv ? undefined : process.env.DB_HOST,
        dialect: isTestEnv ? 'sqlite' : 'mysql',
        storage: isTestEnv ? ':memory:' : undefined, // Configura para usar SQLite em memória durante os testes
        logging: false, // Desativa o log para testes
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexão com o banco de dados deu certo!");

        await sequelize.sync();
        console.log("Modelos sincronizados com o banco de dados!");
    } catch (error) {
        console.error("Erro na conexão com o banco de dados:", error);
    }
};

export { sequelize, connectDB };
