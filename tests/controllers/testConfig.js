
module.exports = {
    dialect: 'sqlite',
    storage: ':memory:',
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js']
};
