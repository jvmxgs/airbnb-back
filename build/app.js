"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes"));
const db_1 = __importDefault(require("./config/db"));
const app = (0, express_1.default)();
const port = 3000;
mongoose_1.default.Promise = Promise;
mongoose_1.default.connect(db_1.default.connectionString)
    .then(() => {
    console.log('Connected to database');
})
    .catch(err => console.log(err));
mongoose_1.default.connection.on('error', (error) => console.log(error));
app.use(express_1.default.json());
app.use('/', (0, routes_1.default)());
app.get('/', (_req, res) => {
    res.send('Hola mundo!');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
