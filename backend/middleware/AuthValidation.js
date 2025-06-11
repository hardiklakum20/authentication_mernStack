const Joi = require("joi");

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(50).required()
    })

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    next();
}

const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(50).required()
    })

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    next();
}

const forgotValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().min(4).required(),
        newPassword: Joi.string().min(4).required(),
        confirmPassword: Joi.string().min(4).valid(Joi.ref('newPassword')).required()
            .messages({ 'any.only': 'confirmPassword must match newPassword' })
    })

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    next();
}

const changeValidation = (req, res, next) => {
    const schema = Joi.object({
        oldPassword: Joi.string().min(4).required(),
        newPassword: Joi.string().min(4).required(),
        confirmPassword: Joi.string().min(4).valid(Joi.ref('newPassword')).required()
            .messages({ 'any.only': 'confirmPassword must match newPassword' })
    })

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    next();
}

module.exports = { signupValidation, loginValidation, forgotValidation, changeValidation }
