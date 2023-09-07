"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const userCreate_1 = require("../middlewares/validation/userCreate");
const isAuthenticated_1 = __importDefault(require("../middlewares/isAuthenticated"));
// import { isAuthenticated, isOwner } from '../middlewares'
exports.default = (router) => {
    router.get('/api/users', isAuthenticated_1.default, user_controller_1.default.index);
    router.post('/api/users', userCreate_1.validateUserCreate, user_controller_1.default.create);
};
