"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserCreate = void 0;
const express_validator_1 = require("express-validator");
exports.validateUserCreate = [
    (0, express_validator_1.body)('fullName').trim().notEmpty().withMessage('Full name is required'),
    (0, express_validator_1.body)('birthDate').isISO8601().withMessage('Invalid date format'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Invalid email address'),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    (0, express_validator_1.body)('role').isIn(['user', 'admin']).withMessage('Invalid user role'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        }
        next();
    }
];
