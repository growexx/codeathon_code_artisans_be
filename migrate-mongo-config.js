// In this file you can configure migrate-mongo
const dotenv = require('dotenv');
const env = process.env.NODE_ENV || 'local';
dotenv.config({ path: env + '.env' });

let dbUrl = `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`;
if (process.env.DB_USERNAME) {
    dbUrl = `mongodb://${process.env.DB_USERNAME}:${encodeURIComponent(process.env.DB_PASSWORD)}@${process.env.DB_HOST}/${process.env.DB_NAME}`;
}

const config = {
    mongodb: {
        url: dbUrl,
        databaseName: process.env.DB_NAME,
        options: {
            useNewUrlParser: true, // removes a deprecation warning when connecting
            useUnifiedTopology: true // removes a deprecating warning when connecting
        }
    },

    // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
    migrationsDir: 'migrations',

    // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
    changelogCollectionName: 'changelog'
};

// Return the config as a promise
module.exports = config;
