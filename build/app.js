"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const i18n_1 = __importDefault(require("i18n"));
const path_1 = __importDefault(require("path"));
const db_1 = __importDefault(require("./config/db"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
i18n_1.default.configure({
    locales: ['en', 'es'],
    defaultLocale: 'en',
    directory: path_1.default.join(__dirname, 'locales'),
    objectNotation: true
});
i18n_1.default.setLocale('en');
db_1.default.connect();
app.use(express_1.default.json());
app.use('/', (0, routes_1.default)());
app.get('/', (_req, res) => {
    res.send('Hola mundo!');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
