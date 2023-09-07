"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const i18n_1 = __importDefault(require("i18n"));
const mailer_1 = __importDefault(require("../config/mailer"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_1 = __importDefault(require("../config/app"));
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
    newUser.validatedAt = undefined;
    newUser.save()
        .then((user) => {
        res.status(201).json({ message: i18n_1.default.__('users.created') });
        const payload = {
            userId: user._id,
            email: user.email
        };
        const token = jsonwebtoken_1.default.sign(payload, app_1.default.secret, { expiresIn: '24h' });
        newUser.validationToken = token;
        newUser.save().catch(error => console.error(error));
        const validationLink = 'https://example.com/validate?token=';
        const mailOptions = {
            from: 'your_email@example.com',
            to: req.body.email,
            subject: 'Account Validation',
            html: `<p>Click the following link to validate your account: <a href="${validationLink}">${validationLink}</a></p>`
        };
        mailer_1.default.sendMail(mailOptions).catch(error => console.error(error));
    })
        .catch((error) => {
        if (error.code === 11000 && 'email' in (error === null || error === void 0 ? void 0 : error.keyPattern)) {
            res.status(400).json({ message: i18n_1.default.__('users.email_in_use') });
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
