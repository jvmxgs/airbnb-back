"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../middlewares/auth");
exports.default = (router) => {
    router.post('/login', auth_1.authenticateUser, (_req, res) => {
        const { username } = res.locals.user;
        const token = res.locals.token;
        res.json({ message: 'Login successful', username, token });
    });
};
