"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
// const usersService = require('../services/users.service');
function index(_req, res, next) {
    try {
        res.json({ response: 'success' });
    }
    catch (err) {
        const error = err;
        console.error('Error while getting users', error.message);
        next(error);
    }
}
function create(req, res, next) {
    const { fullName, birthDate, email, password, role } = req.body;
    const newUser = new user_model_1.default({ fullName, birthDate, email, password, role });
    newUser.save()
        .then(() => {
        res.status(201).json({ message: 'User registered successfully' });
    })
        .catch((error) => {
        if (error.code === 11000 && 'email' in (error === null || error === void 0 ? void 0 : error.keyPattern)) {
            res.status(400).json({ message: 'Email already in use' });
            return;
        }
        next(error);
    });
}
/*
async function update(req, res, next) {
  try {
    console.log(' update users - - - - - - - - - - - - - - - - - -')
    // res.json(await usersService.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating programming language`, err.message);
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    console.log(' remove users - - - - - - - - - - - - - - - - - -')
    // res.json(await usersService.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting programming language`, err.message);
    next(err);
  }
} */
exports.default = {
    index,
    create
    /* create,
    update,
    remove */
};
