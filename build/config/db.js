"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
function connect() {
    var _a;
    mongoose_1.default.Promise = Promise;
    mongoose_1.default.connect((_a = process.env.MONGODB_URI) !== null && _a !== void 0 ? _a : 'mongodb://airbnb-mongodb:27017/airbnb')
        .then(() => {
        console.log('Connected to database');
    })
        .catch(err => console.log(err));
    mongoose_1.default.connection.on('error', (error) => console.log(error));
}
exports.default = {
    connect
};
