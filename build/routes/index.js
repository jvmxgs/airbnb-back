"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_route_1 = __importDefault(require("./login.route"));
const user_route_1 = __importDefault(require("./user.route"));
const router = express_1.default.Router();
exports.default = () => {
    (0, login_route_1.default)(router);
    (0, user_route_1.default)(router);
    return router;
};
