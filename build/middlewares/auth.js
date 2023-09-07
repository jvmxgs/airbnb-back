"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const authenticateUser = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    user_model_1.default.findOne({ email })
        .then((user) => {
        if (user === null) {
            res.status(401).json({ message: 'Authentication failed' });
            return;
        }
        if (user.password !== password) {
            res.status(401).json({ message: 'Authentication failed' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ email }, 'your-secret-key');
        res.locals.user = { email };
        res.locals.token = token;
        next();
    })
        .catch((error) => {
        console.error('Authentication error', error);
        res.status(500).json({ message: 'Internal server error' });
    });
};
exports.authenticateUser = authenticateUser;
