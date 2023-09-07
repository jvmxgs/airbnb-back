"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserCreate = void 0;
const express_validator_1 = require("express-validator");
const i18n_1 = __importDefault(require("i18n"));
exports.validateUserCreate = [
    (0, express_validator_1.body)('fullName').trim().notEmpty().withMessage('validation.users.fullname_required'),
    (0, express_validator_1.body)('birthDate').isISO8601().withMessage('validation.users.invalid_birth_date'),
    (0, express_validator_1.body)('email').isEmail().withMessage('validation.users.invalid_email'),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('validation.users.invalid_password'),
    (0, express_validator_1.body)('role').isIn(['user', 'admin']).withMessage('validation.users.invalid_role'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const errs = translateErrorMessages(errors.array());
            res.status(422).json({ errors: errs });
            return;
        }
        next();
    }
];
function translateErrorMessages(errors) {
    return errors.map((error) => {
        error.msg = i18n_1.default.__(error.msg);
        return error;
    });
}
