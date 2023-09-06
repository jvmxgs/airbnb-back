"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dockerMongoDBHost = 'airbnb-mongodb';
const dbName = 'airbnb';
const connectionString = `mongodb://${dockerMongoDBHost}:27017/${dbName}`;
// const connectionString = 'mongodb+srv://pros-usr-test:dvWcUvporbFKQ0Vi@exam-clus.vc7ioj7.mongodb.net/sample_airbnb'
exports.default = {
    connectionString
};
