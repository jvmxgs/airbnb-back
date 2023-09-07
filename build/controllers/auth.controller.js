"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAccount = exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const i18n_1 = __importDefault(require("i18n"));
const app_1 = __importDefault(require("../config/app"));
const authenticateUser = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    user_model_1.default.findOne({ email })
        .then((user) => {
        if (user === null) {
            res.status(401).json({ message: i18n_1.default.__('auth.failed') });
            return;
        }
        if (user.validatedAt === null) {
            res.status(401).json({ message: i18n_1.default.__('auth.verify_account') });
            return;
        }
        if (!bcrypt_1.default.compareSync(password, user.password)) {
            res.status(401).json({ message: i18n_1.default.__('auth.failed') });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ email }, app_1.default.secret);
        res.locals.user = { email };
        res.locals.token = token;
        res.json({ message: i18n_1.default.__('auth.login_success'), token });
        next();
    })
        .catch((error) => {
        console.error('Authentication error', error);
        res.status(500).json({ message: 'Internal server error' });
    });
};
exports.authenticateUser = authenticateUser;
const validateAccount = (req, res, next) => {
    console.log(req, res, next);
};
exports.validateAccount = validateAccount;
