import { sequelize } from '../src/dbconfig/dbConnect.js';

beforeEach(async () => {
    await sequelize.sync({ force: true }); 
});

afterEach(async () => {
    await sequelize.drop();
});