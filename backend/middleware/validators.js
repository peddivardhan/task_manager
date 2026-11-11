const { body, param, query, validationResult } = require("express-validator");

const signupRules = [
  body("name").isString().withMessage("name is required").bail().trim().notEmpty().withMessage("name is required"),
  body("email").isString().withMessage("email is required").bail().trim().toLowerCase().isEmail().withMessage("a valid email is required"),
  body("password").isString().withMessage("password is required").bail().isLength({ min: 8, max: 72 }).withMessage("password must be 8 to 72 characters"),
];

const loginRules = [
  body("email").isString().withMessage("email is required").bail().trim().toLowerCase().isEmail().withMessage("a valid email is required"),
  body("password").isString().withMessage("password is required").bail().notEmpty().withMessage("password is required"),
];

const createTaskRules = [
  body("title").isString().withMessage("title is required").bail().trim().notEmpty().withMessage("title is required").isLength({ max: 200 }).withMessage("title must be at most 200 characters"),
];

const listTaskRules = [
  query("filter").optional().isIn(["all", "done", "pending"]).withMessage("filter must be all, done or pending"),
];

const idRule = [param("id").isMongoId().withMessage("id must be a valid id")];

function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const details = errors.array().map((e) => ({ field: e.path, message: e.msg }));
    return res.status(400).json({ error: details[0].message, details });
  }
  next();
}

module.exports = { signupRules, loginRules, createTaskRules, listTaskRules, idRule, handleValidation };