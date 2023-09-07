"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../controllers/auth.controller");
exports.default = (router) => {
    router.post('/login', auth_controller_1.authenticateUser);
    router.get('/validate', auth_controller_1.validateAccount);
};
