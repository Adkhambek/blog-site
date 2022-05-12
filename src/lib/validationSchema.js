const Joi = require("joi");

exports.categorySchema = Joi.object({
    name: Joi.string().max(15).required().messages({
        "string.base": "Name field must be string",
        "string.empty": "Name field is not allowed to be empty",
        "string.max": "Name length must be less than or equal to 15 characters long",
        "any.required": "Name field is required"
    })
});

exports.imageSchema = Joi.object({
    title: Joi.string().max(120).required().messages({
        "string.base": "Title field must be string",
        "string.empty": "Title field is not allowed to be empty",
        "string.max": "Title length must be less than or equal to 15 characters long",
        "any.required": "Title field is required"
    })
});

exports.postSchema = Joi.object({
    title: Joi.string().max(120).required().messages({
        "string.base": "Title field must be string",
        "string.empty": "Title field is not allowed to be empty",
        "string.max": "Title length must be less than or equal to 15 characters long",
        "any.required": "Title field is required"
    }),
    content: Joi.string().required().messages({
        "string.base": "Content field must be string",
        "string.empty": "Content field is not allowed to be empty",
        "any.required": "Content field is required"
    }),
    categoryId: Joi.number().required().messages({
        "number.base": "Category id field must be number",
        "number.empty": "Category id field is not allowed to be empty",
        "any.required": "Category id field is required"
    })
});

exports.loginSchema = Joi.object({
    username: Joi.string().required().messages({
        "string.base": "Username field must be string",
        "string.empty": "Username field is not allowed to be empty",
        "any.required": "Username field is required"
    }),
    password: Joi.string().required().messages({
        "string.base": "Password field must be string",
        "string.empty": "Password field is not allowed to be empty",
        "any.required": "Password field is required"
    })
});
