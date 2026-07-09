const { body } = require("express-validator");

exports.signupValidator = [
    body("username")
        .trim()
        .notEmpty().withMessage("Username is required.")
        .isLength({ min: 3, max: 30 }).withMessage("Username must be between 3 and 30 characters.")
        .matches(/^[A-Za-z]+$/).withMessage("Username should only contain alphabets."),

    body("email")
        .trim()
        .notEmpty().withMessage("Email is required.")
        .isEmail().withMessage("Please enter a valid email.")
        .normalizeEmail(),

    body("password")
        .notEmpty().withMessage("Password is required.")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long.")
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        })
        .withMessage(
            "Password must contain uppercase, lowercase, number and special character."
        ),
];

exports.loginValidator = [
    body("email")
        .trim()
        .notEmpty().withMessage("Email is required.")
        .isEmail().withMessage("Please enter a valid email.")
        .normalizeEmail(),

    body("password")
        .notEmpty().withMessage("Password is required."),
];